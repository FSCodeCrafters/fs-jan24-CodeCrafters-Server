import { ERROR_MESSAGE } from '../constants/error.messages';
import { CODE_STATUSES } from '../constants/code.statuses';
import * as productService from '../services/product.service';
import { type Product } from '../types/Product';
import { type Request, type Response } from 'express';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const products: Product[] = await productService.getAll();

  res.send(products);
};

export const getByCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { route: category } = req.params;
  const {
    sort,
    perPage,
    page,
  }: {
    sort?: string | undefined;
    perPage?: string | undefined;
    page?: string | undefined;
  } = req.query;

  const { products, totalPages }: { products: Product[]; totalPages: number } =
    await productService.getByCategory(
      category,
      sort,
      perPage as string,
      page as string,
    );

  if (products.length === 0) {
    res.sendStatus(CODE_STATUSES.NOT_FOUND);

    return;
  }

  res.send({ products, totalPages });
};

export const getNewestProducts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const products: Product[] = await productService.getNewestProducts();
  res.send(products);
};

export const getTopDiscountProducts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const products: Product[] = await productService.getTopDiscountProducts();
  res.send(products);
};

export const searchProductsByTitle = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const nameQuery = req.query.name as string;
    const products = await productService.searchProductsByTitle(nameQuery);
    res.send(products);
  } catch (e: unknown) {
    const error = e as Error;
    if (error.message === ERROR_MESSAGE.BAD_REQUEST) {
      res.status(CODE_STATUSES.BAD_REQUEST).send(ERROR_MESSAGE.BAD_REQUEST);
    }
  }
};

export const getRecommended = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { route: id } = req.params;
    const products: Product[] = await productService.getRecommended(id);
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
