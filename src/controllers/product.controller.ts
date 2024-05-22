import { ERROR_MESSAGE } from '../constants/error.messages';
import { CODE_STATUSES } from '../constants/code.statuses';
import * as productService from '../services/product.service';
import { type Product } from '../types/Product';
import { type Request, type Response } from 'express';

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

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const productItem = await productService.getById(id);

  if (productItem === null || productItem === undefined) {
    res.sendStatus(CODE_STATUSES.NOT_FOUND);

    return;
  }

  res.send(productItem);
};
