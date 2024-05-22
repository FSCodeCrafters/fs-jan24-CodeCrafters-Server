import { ERROR_MESSAGE } from '../constants/error.messages';
import * as productService from '../services/product.service';
import { type Product } from '../types/Product';
import { type Request, type Response } from 'express';
import { CODE_STATUSES } from '../constants/code.statuses';

export const get = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await productService.getAll();
  res.send(products);
};

export const getRecommended = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const products: Product[] = await productService.getRecommended(+id);
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

export const getNewestProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products: Product[] = await productService.getNewestProducts();
  res.send(products);
};

export const getTopDiscountProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products: Product[] = await productService.getTopDiscountProducts();
  res.send(products);
};
