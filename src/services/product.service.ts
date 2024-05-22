import { db } from '../db';
import { type Product } from '../types/Product';

export const getAll = async (): Promise<Product[]> => {
  return await db.product.findMany();
};
