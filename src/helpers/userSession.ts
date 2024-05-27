import { User } from '@prisma/client';
import { UserSession } from '../types/UserSession';

export const mapUserToSession = (user: User): UserSession => {
  return {
    id: user.id,
  };
};
