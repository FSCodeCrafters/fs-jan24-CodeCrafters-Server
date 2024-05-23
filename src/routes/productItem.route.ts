import express from 'express';
import { catchError } from '../utils/catchError';
import * as productItemController from '../controllers/productItem.controller';

export const router = express.Router();

router.get('/:id', catchError(productItemController.getOne));
router.get(
  '/:id/recommended',
  catchError(productItemController.getRecommended),
);
