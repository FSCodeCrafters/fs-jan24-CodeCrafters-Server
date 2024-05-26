import { User } from '@prisma/client';
import { db } from '../db';
import { ERROR_MESSAGE } from '../constants/error.messages';

export const createUser = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const user = await db.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  } catch (e) {
    throw new Error(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
  }
};

export const getUser = async (email: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const user = await getUser(email);
  if (!user) {
    throw new Error(ERROR_MESSAGE.INVALID_CREDENTIALS);
  }

  if (user.password === null) {
    throw new Error(ERROR_MESSAGE.INVALID_AUTH_PROVIDER);
  }

  const isPasswordCorrect = user.password === password;

  if (!isPasswordCorrect) {
    throw new Error(ERROR_MESSAGE.INVALID_CREDENTIALS);
  }

  return user;
};
