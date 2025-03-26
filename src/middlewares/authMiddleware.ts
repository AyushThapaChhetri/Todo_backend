import { JWT_SECRET } from "@app/config/config";
import prisma from "@app/config/db.config";
import { UnauthorizedError } from "@app/service/contract/errors/errors";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

// type BaseRequest = Request & { user: User };
export const authenticateUser = async (
  // req: BaseRequest,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Get token from the Headers, Extract token from header
  // const token = req.headers.authorization;

  const token = req.headers.authorization?.split(" ")[1]; // Extract only the token
  // 2.If token is not present, throw an error of unauthorized
  if (!token) {
    return next(new UnauthorizedError("Unauthorized: No token provided"));
  }
  try {
    // 3. If the token is present, verify that token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as any;
    console.log(payload);

    // 4. To get the user from the payload
    const user = await prisma.user.findFirst({
      where: { uid: payload.userId },
    });

    if (!user) {
      //   throw new UnauthorizedError("Unauthorized: No token provided");
      return next(new UnauthorizedError("Unauthorized: No token provided"));
    }
    // 5. To attach the user to the current request object
    req.user = user as any;
    console.log("User set in middleware:", req.user);
    next();
  } catch (error) {
    console.error(error);
    // return next(new UnauthorizedError("Unauthorized: No token provided");
    return next(new UnauthorizedError("Unauthorized: Invalid token"));
  }
};
