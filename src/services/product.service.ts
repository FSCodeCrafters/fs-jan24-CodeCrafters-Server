import { ERROR_MESSAGE } from '../constants/error.messages';
import { db } from '../db';
import { type Product } from '../types/Product';

export const getAll = async (): Promise<Product[]> => {
  return await db.product.findMany();
};

export const getRecommended = async (id: number): Promise<Product[]> => {
  const product = await db.product.findUnique({
    where: { id }
  });

  if (product === null) {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }

  const category = product.category;

  return await db.product.findMany({
    where: {
      category,
      id: {
        not: id
      }
    },
    take: 20
  });
};

export const getNewestProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({
    where: {
      year: 2022
    },
    take: 20
  });
};

export const getTopDiscountProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany();

  products.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return products.slice(0, 20);
};
