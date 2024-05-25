import { db } from '../db';
import { ERROR_MESSAGE } from '../constants/error.messages';
import { type Product } from '../types/Product';
import { PER_PAGE, SORT_BY } from '../constants/sorting';

export const getAll = async (): Promise<Product[]> => {
  return await db.product.findMany();
};

export const getTotalCountByCategory = async (
  category: string,
  minPrice: number,
  maxPrice: number,
): Promise<number> => {
  const where = {
    category,
    price: {
      gte: minPrice,
      lte: maxPrice,
    },
  };

  const totalCount = await db.product.count({
    where,
  });

  return totalCount;
};

export const getMinMaxPriceByCategory = async (
  category: string,
): Promise<{ minPrice: number; maxPrice: number }> => {
  const result = await db.product.aggregate({
    where: {
      category,
    },
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  return {
    minPrice: result._min.price || 0,
    maxPrice: result._max.price || 0,
  };
};

export const getByCategory = async (
  category: string,
  sortBy: string | undefined,
  perPage: string,
  page: string,
  range: string | null,
): Promise<{
  products: Product[];
  totalPages: number;
  min: number;
  max: number;
}> => {
  const orderBy =
    sortBy && SORT_BY.includes(sortBy) ? { [sortBy]: 'asc' } : undefined;

  const take = PER_PAGE.includes(perPage) ? Number(perPage) : 16;

  const pageNumber = page ? Number(page) : 1;
  const skip = (pageNumber - 1) * take;
  const { minPrice: min, maxPrice: max } =
    await getMinMaxPriceByCategory(category);

  const minPrice = Number(range?.split(',')[0]) || min;
  const maxPrice = Number(range?.split(',')[1]) || max;

  const products = await db.product.findMany({
    where: {
      category,
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    },
    orderBy,
    skip,
    take,
  });

  const totalCount = await getTotalCountByCategory(
    category,
    minPrice,
    maxPrice,
  );

  const totalPages = Math.ceil(totalCount / take);

  return { products, totalPages, min, max };
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

export const getRecommended = async (itemId: string): Promise<Product[]> => {
  const product = await db.product.findFirst({
    where: { itemId },
  });
  if (product === null) {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }
  const category = product.category;

  return await db.product.findMany({
    where: {
      category,
      itemId: {
        not: product.itemId,
      },
    },
    take: 20,
  });
};
