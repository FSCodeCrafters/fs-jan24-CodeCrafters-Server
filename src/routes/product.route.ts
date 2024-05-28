import express from 'express';
import * as productController from '../controllers/product.controller';
import { catchError } from '../utils/catchError';
import { determineRoute } from '../utils/determineRoute';

export const router = express.Router();

router.get('/', catchError(productController.getAll));
router.get('/search', catchError(productController.searchProductsByTitle));
router.get('/new', catchError(productController.getNewestProducts));
router.get('/discount', catchError(productController.getTopDiscountProducts));
router.get('/counts', catchError(productController.getProductCounts));
router.get(
  '/:route',
  determineRoute('category'),
  catchError(productController.getByCategory),
);
router.get(
  '/:route/recommended',
  determineRoute('itemId'),
  catchError(productController.getRecommended),
);
router.get(
  '/:route/itemId',
  determineRoute('itemId'),
  catchError(productController.getByItemId),
);
