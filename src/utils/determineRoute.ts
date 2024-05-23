import { type Request, type Response, type NextFunction } from 'express';

export const determineRoute = (type: string) => {
  return (_req: Request, _res: Response, next: NextFunction) => {
    if (type === 'category') {
      next();
    } else if (type === 'itemId') {
      next();
    } else {
      next('route');
    }
  };
};
