import { PrismaClient } from '@prisma/client';
declare global {
  // eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma ?? new PrismaClient();
