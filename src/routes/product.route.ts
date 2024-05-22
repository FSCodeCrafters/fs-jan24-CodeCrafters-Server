import express from 'express';
import * as productController from '../controllers/product.controller';
import { catchError } from '../utils/catchError';

export const router = express.Router();

router.get('/', catchError(productController.get));
router.get('/:id/recommended', catchError(productController.getRecommended));
router.get('/new', catchError(productController.getNewestProducts));
router.get('/discount', catchError(productController.getTopDiscountProducts));
