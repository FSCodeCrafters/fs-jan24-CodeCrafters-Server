import { type Request, type Response } from 'express';
import { CODE_STATUSES } from '../constants/code.statuses';
import { ERROR_MESSAGE } from '../constants/error.messages';
import * as favoritesService from '../services/favorites.service';

export const getByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;
  const favorites = await favoritesService.getByUserId(userId);

  if (!favorites) {
    res.status(CODE_STATUSES.NOT_FOUND).send(ERROR_MESSAGE.NOT_FOUND);
  }
  res.send(favorites);
};

export const addProductToFavorites = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId, productId } = req.body;
  await favoritesService.addProductToFavorites(userId, productId);
  res.status(CODE_STATUSES.OK);
};

export const deleteProductFromFavorites = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId, productId } = req.body;
  await favoritesService.deleteProductFromFavorites(userId, productId);
  res.status(CODE_STATUSES.OK);
};
