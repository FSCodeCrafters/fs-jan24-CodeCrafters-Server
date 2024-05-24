import passport from 'passport';
import { Router } from 'express';
import { CODE_STATUSES } from '../constants/code.statuses';
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
router.get(
  '/api/auth/callback/google',
  passport.authenticate('google'),
  (_request, response) => {
    response.sendStatus(CODE_STATUSES.OK);
  },
);
