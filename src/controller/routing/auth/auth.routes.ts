// // import { signup } from "@controller/auth.controller";
// import { NextFunction, Router } from "express";
// import { validate_schemas } from "../../../middlewares/validationMiddleware";
// import {
//   refreshTokenValidationSchema,
//   signupValidationSchema,
// } from "../../validation/auth.validation";
// import { loginValidationSchema } from "../../validation/auth.validation";
// import { AuthController } from "src/controller/auth.controller";
// import { HttpErrorHandler } from "src/service/contract/errors/errorHandler";
// import { authenticateUser } from "@app/middlewares/authMiddleware";

// const BASE_URL = "/auth";

// const router = Router();

// // Define the signup route
// router.post(
//   `${BASE_URL}/signup`,
//   validate_schemas(signupValidationSchema),
//   HttpErrorHandler.catch(AuthController.signup)
// );

// router.post(
//   `${BASE_URL}/login`,
//   validate_schemas(loginValidationSchema),
//   HttpErrorHandler.catch(AuthController.login)
// );

// router.post(
//   `${BASE_URL}/refresh`,
//   validate_schemas(refreshTokenValidationSchema),
//   HttpErrorHandler.catch(AuthController.refresh)
// );

// router.post(
//   `${BASE_URL}/logout`,
//   validate_schemas(refreshTokenValidationSchema),
//   HttpErrorHandler.catch(AuthController.logout)
// );

// router.get(
//   `${BASE_URL}/me`,
//   authenticateUser,
//   HttpErrorHandler.catch(AuthController.me)
// );
// // authenticateUser,

// export const authRouter = router;
