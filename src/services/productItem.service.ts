import { type ProductItem } from '@prisma/client';
import { db } from '../db';
import { ERROR_MESSAGE } from '../constants/error.messages';

export const getOne = async (id: string): Promise<ProductItem | null> => {
  return await db.productItem.findUnique({
    where: {
      id,
    },
  });
};

export const getRecommended = async (id: string): Promise<ProductItem[]> => {
  const product = await getOne(id);

  if (product === null) {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }

  const category = product.category;

  return await db.productItem.findMany({
    where: {
      category,
      id: {
        not: id,
      },
    },
    take: 20,
  });
};
