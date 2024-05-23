import { CODE_STATUSES } from '../constants/code.statuses';
import { ERROR_MESSAGE } from '../constants/error.messages';
import { type Request, type Response } from 'express';
import * as productItemService from '../services/productItem.service';
import { type ProductItem } from '@prisma/client';

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const productItem = await productItemService.getOne(id);

  if (!productItem) {
    res.status(CODE_STATUSES.NOT_FOUND).send(ERROR_MESSAGE.NOT_FOUND);

    return;
  }

  res.send(productItem);
};

export const getRecommended = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const products: ProductItem[] = await productItemService.getRecommended(id);
    res.send(products);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.message === ERROR_MESSAGE.BAD_REQUEST) {
      res.status(CODE_STATUSES.BAD_REQUEST).send(ERROR_MESSAGE.BAD_REQUEST);
    }
    if (error.message === ERROR_MESSAGE.NOT_FOUND) {
      res.status(CODE_STATUSES.NOT_FOUND).send(ERROR_MESSAGE.NOT_FOUND);
    }
  }
};
