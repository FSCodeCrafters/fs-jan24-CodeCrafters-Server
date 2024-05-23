import { db } from '../db';
import { ERROR_MESSAGE } from '../constants/error.messages';
import { type ProductItem } from '@prisma/client';
import { type Product } from '../types/Product';
import { PER_PAGE, SORT_BY } from '../constants/sorting';

export const getAll = async (): Promise<Product[]> => {
  return await db.product.findMany();
};

export const getOne = async (id: string): Promise<ProductItem | null> => {
  return await db.productItem.findUnique({
    where: {
      id,
    },
  });
};

export const getTotalCountByCategory = async (
  category: string,
): Promise<number> => {
  return await db.product.count({
    where: {
      category,
    },
  });
};

export const getByCategory = async (
  category: string,
  sortBy: string | undefined,
  perPage: string | undefined,
  page: string | undefined,
): Promise<{ products: Product[]; totalPages: number }> => {
  const orderBy =
    sortBy && SORT_BY.includes(sortBy) ? { [sortBy]: 'asc' } : undefined;

  const take = perPage && PER_PAGE.includes(perPage) ? Number(perPage) : 16;

  const pageNumber = page ? Number(page) : 1;
  const skip = (pageNumber - 1) * take;

  const products = await db.product.findMany({
    where: {
      category,
    },
    orderBy,
    skip,
    take,
  });

  const totalCount = await getTotalCountByCategory(category);
  const totalPages = Math.ceil(totalCount / take);

  return { products, totalPages };
};

export const getRecommended = async (id: number): Promise<Product[]> => {
  const product = await db.product.findUnique({
    where: { id },
  });

  if (product === null) {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }

  const category = product.category;

  return await db.product.findMany({
    where: {
      category,
      id: {
        not: id,
      },
    },
    take: 20,
  });
};

export const getNewestProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({
    where: {
      year: 2022,
    },
    take: 20,
  });
};

export const getTopDiscountProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany();

  products.sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return products.slice(0, 20);
};

export const searchProductsByTitle = async (
  searchTerm: string,
): Promise<Product[]> => {
  if (!searchTerm) {
    throw new Error(ERROR_MESSAGE.BAD_REQUEST);
  }

  return await db.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
  });
};
