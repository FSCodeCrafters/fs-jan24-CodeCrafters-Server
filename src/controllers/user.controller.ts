import { type Request, type Response } from 'express';
import * as userService from '../services/user.service';
import { ERROR_MESSAGE } from '../constants/error.messages';
import { CODE_STATUSES } from '../constants/code.statuses';
import {
  LoginSchema,
  RegistrationSchema,
} from '../schemas/authValidationSchema';

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = RegistrationSchema.safeParse(req.body);

    if (!result.success) {
      res.status(CODE_STATUSES.BAD_REQUEST).send(result.error.errors);
      return;
    }

    const { email, password } = result.data;
    const user = await userService.createUser(email, password);
    res.send(user);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.message === ERROR_MESSAGE.EMAIL_ALREADY_EXISTS) {
      res
        .status(CODE_STATUSES.BAD_REQUEST)
        .send(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
    }
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  const user = await userService.getUser(email);
  if (!user) {
    res.status(CODE_STATUSES.NOT_FOUND).send(ERROR_MESSAGE.NOT_FOUND);
  }
  res.send(user);
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
      res.status(CODE_STATUSES.BAD_REQUEST).send(result.error.errors);
      return;
    }

    const { email, password } = result.data;
    const user = await userService.loginUser(email, password);
    res.send(user);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.message === ERROR_MESSAGE.INVALID_CREDENTIALS) {
      res
        .status(CODE_STATUSES.BAD_REQUEST)
        .send(ERROR_MESSAGE.INVALID_CREDENTIALS);
    }
    if (error.message === ERROR_MESSAGE.INVALID_AUTH_PROVIDER) {
      res
        .status(CODE_STATUSES.BAD_REQUEST)
        .send(ERROR_MESSAGE.INVALID_AUTH_PROVIDER);
    }
  }
};
