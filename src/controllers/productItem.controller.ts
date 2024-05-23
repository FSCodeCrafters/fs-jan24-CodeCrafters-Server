import { CODE_STATUSES } from '../constants/code.statuses';
import { ERROR_MESSAGE } from '../constants/error.messages';
import { type Request, type Response } from 'express';
import * as productItemService from '../services/productItem.service';

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const productItem = await productItemService.getOne(id);

  if (!productItem) {
    res.status(CODE_STATUSES.NOT_FOUND).send(ERROR_MESSAGE.NOT_FOUND);

    return;
  }

  res.send(productItem);
};
