import { Product } from '@prisma/client';
import { db } from '../db';

export const getByUserId = async (
  userId: string,
): Promise<Product[] | null> => {
  const userFavorites = await db.favorites.findUnique({
    where: {
      userId,
    },
  });

  if (userFavorites === null) {
    throw Error('User has no favorites');
  }

  const favorites = userFavorites.productIds;

  return await db.product.findMany({
    where: {
      id: {
        in: favorites,
      },
    },
  });
};

export const addProductToFavorites = async (
  userId: string,
  productId: number,
): Promise<void> => {
  const userFavorites = await db.favorites.findUnique({
    where: {
      userId,
    },
  });

  if (userFavorites === null) {
    await db.favorites.create({
      data: {
        userId,
        productIds: [productId],
      },
    });
  } else {
    const favorites = userFavorites.productIds;

    if (favorites.includes(productId)) {
      throw Error('Product already in favorites');
    }
    const newFavorites = [...favorites, productId];

    await db.favorites.update({
      where: {
        userId,
      },
      data: {
        productIds: newFavorites,
      },
    });
  }
};

export const deleteProductFromFavorites = async (
  userId: string,
  productId: number,
): Promise<void> => {
  const userFavorites = await db.favorites.findUnique({
    where: {
      userId,
    },
  });

  if (userFavorites === null) {
    throw Error('User has no favorites');
  }

  const favorites = userFavorites.productIds;

  if (favorites.includes(productId) && favorites.length === 1) {
    await db.favorites.delete({
      where: {
        userId,
      },
    });
  } else {
    await db.favorites.update({
      where: {
        userId,
      },
      data: {
        productIds: favorites.filter((id) => id !== productId),
      },
    });
  }
};
