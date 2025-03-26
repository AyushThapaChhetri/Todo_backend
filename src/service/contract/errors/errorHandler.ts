import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "./errors";
import { DBError } from "./dbErrorHandler";

class _HttpErrorHandler {
  private log(error: Object) {
    console.error(error);
    console.error(JSON.stringify(error, undefined, "  "));
  }

  catch(
    httpFunction: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<{ statusCode: number; data: Object }>
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data, statusCode } = await httpFunction(req, res, next);
        res.status(statusCode).json(data);
      } catch (error: any) {
        this.log(error.log || error);
        if (error instanceof BadRequestError) {
          res.status(error.statusCode).json({
            message: error.message,
          });
        } else if (error instanceof DBError) {
          res.status(error.statusCode).json({
            message: error.message,
          });
        } else if (error instanceof UnauthorizedError) {
          res.status(error.statusCode).json({
            message: error.message,
          });
        } else {
          const statusCode = error.statusCode || 500;
          res.status(statusCode).json({
            message: error?.message ?? "Something went wrong",
          });
        }
      }
    };
  }
}
export const HttpErrorHandler = new _HttpErrorHandler();
