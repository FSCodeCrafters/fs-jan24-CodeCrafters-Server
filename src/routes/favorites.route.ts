import express from 'express';
import * as favoritesController from '../controllers/favorites.controller';
import { catchError } from '../utils/catchError';

export const router = express.Router();

router.post('/', catchError(favoritesController.addProductToFavorites));
router.delete('/', catchError(favoritesController.deleteProductFromFavorites));
router.get('/:userId', catchError(favoritesController.getByUserId));
