import { type Request, type Response, type NextFunction } from 'express';

export const catchError =
  (
    action: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await action(req, res, next);
      } catch (error) {
        next(error);
      }
    };
