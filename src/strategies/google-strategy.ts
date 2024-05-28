import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { db } from '../db';
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      scope: ['profile', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        if (profile.emails && profile.emails.length > 0) {
          const email = profile.emails[0].value;

          const findUser = await db.user.findUnique({
            where: { email },
          });

          if (findUser) {
            return done(null, findUser);
          } else {
            const newUser = await db.user.create({
              data: {
                email,
                name: profile.displayName || null,
              },
            });
            return done(null, newUser);
          }
        } else {
          return done(new Error('No email found in user profile'), false);
        }
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
