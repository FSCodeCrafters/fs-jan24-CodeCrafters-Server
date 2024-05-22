import * as productService from '../services/product.service';
import { type Product } from '../types/Product';
import { type Request, type Response } from 'express';

export const get = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await productService.getAll();
  res.send(products);
};
