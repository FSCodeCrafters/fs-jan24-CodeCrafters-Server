import { type Request, type Response, type NextFunction } from 'express';

export const determineRoute = (type: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const isID = !isNaN(+req.params?.route);

    if (!isID && type === 'category') {
      next();
    } else if (isID && type === 'id') {
      next();
    } else {
      next('route');
    }
  };
};
