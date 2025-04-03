// import { signup } from "@controller/auth.controller";
import { NextFunction, Router } from "express";
import { validate_schemas } from "../../../middlewares/validationMiddleware";
import { signupValidationSchema } from "../../validation/auth.validation";
import { loginValidationSchema } from "../../validation/auth.validation";
import { AuthController } from "src/controller/auth.controller";
import { HttpErrorHandler } from "src/service/contract/errors/errorHandler";
import { authenticateUser } from "@app/middlewares/authMiddleware";

const BASE_URL = "/auth";

const router = Router();
// Root route inside routing folder
// router.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to the API!");
// });

// Define the signup route
router.post(
  `${BASE_URL}/signup`,
  validate_schemas(signupValidationSchema),
  HttpErrorHandler.catch(AuthController.signup)
);

router.post(
  `${BASE_URL}/login`,
  validate_schemas(loginValidationSchema),
  HttpErrorHandler.catch(AuthController.login)
);

router.post(
  `${BASE_URL}/refresh`,
  HttpErrorHandler.catch(AuthController.refresh)
);
router.post(
  `${BASE_URL}/logout`,
  HttpErrorHandler.catch(AuthController.logout)
);
router.get(
  `${BASE_URL}/me`,
  authenticateUser,
  HttpErrorHandler.catch(AuthController.me)
);
// authenticateUser,

export const authRouter = router;

// class BaseController {
//   post(
//     path: Parameters<routerPostType>["0"],
//     ...handlers: ((
//       req: Request,
//       res: Response,
//       next: NextFunction
//     ) => Promise<Object>)[]
//   ) {
//     const executeHandlers: Parameters<routerPostType>["1"] = async (
//       req,
//       res,
//       next
//     ) => {
//       let response: Object | undefined;
//       for (const handler of handlers) {
//         response = await handler(req);
//       }
//       res.send(response);
//     };
//     const res = Router().post(path, executeHandlers);
//   }
// }
