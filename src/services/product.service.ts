import { type ProductItem } from '@prisma/client';
import { db } from '../db';
import { type Product } from '../types/Product';

export const getAll = async (): Promise<Product[]> => {
  return await db.product.findMany();
};

export const getById = async (id: string): Promise<ProductItem | null> => {
  return await db.productItem.findUnique({
    where: {
      id
    }
  });
};
