import { type ProductItem } from '@prisma/client';
import { db } from '../db';

export const getOne = async (id: string): Promise<ProductItem | null> => {
  return await db.productItem.findUnique({
    where: {
      id,
    },
  });
};
