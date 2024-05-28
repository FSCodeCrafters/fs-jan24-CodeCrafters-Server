import passport from 'passport';
import { Router } from 'express';
import { CODE_STATUSES } from '../constants/code.statuses';
import { catchError } from '../utils/catchError';
import * as userController from '../controllers/user.controller';
import { User } from '@prisma/client';

export const router = Router();

router.get('/api/auth/status', (request, response) => {
  return request.user
    ? response.send(request.user)
    : response.sendStatus(CODE_STATUSES.UNAUTHORIZED);
});

router.post('/api/auth/logout', (request, response) => {
  if (!request.user) return response.sendStatus(CODE_STATUSES.BAD_REQUEST);
  request.logout((err) => {
    if (err) return response.sendStatus(CODE_STATUSES.BAD_REQUEST);
    response.send(CODE_STATUSES.OK);
  });
});

router.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get('/api/auth/callback/google', (req, res, next) => {
  passport.authenticate('google', async (err: Error, user: User) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const userId = user.id;
      res.redirect(
        `https://fs-jan24-codecrafters.github.io/fs-jan24-CodeCrafters/#/?userId=${userId}`,
      );
    });
  })(req, res, next);
});

router.post('/api/auth/register', catchError(userController.createUser));
router.post('/api/auth/login', catchError(userController.loginUser));
router.get('/api/auth/users/:id', catchError(userController.getUserById));
