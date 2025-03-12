import * as Yup from "yup";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: Yup.ObjectSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next(); // Move to the next step if validation passes
    } catch (error) {
      //   res.status(400).json({ error: (error as Yup.ValidationError).errors });
      res.status(400).json({
        message: "Validation failed",
        errors: (error as Yup.ValidationError).inner.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    }
  };
};
