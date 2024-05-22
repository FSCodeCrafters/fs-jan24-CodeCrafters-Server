import { CODE_STATUSES } from '../constants/code.statuses';
import * as productService from '../services/product.service';
import { type Product } from '../types/Product';
import { type Request, type Response } from 'express';

export const get = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await productService.getAll();
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
