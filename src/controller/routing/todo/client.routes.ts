// // import { signup } from "@controller/auth.controller";
// import { Router } from "express";
// import { Request, Response } from "express";
// import { validate_schemas } from "../../../middlewares/validationMiddleware";
// import { signupValidationSchema } from "../../validation/auth.validation";
// import { authenticateUser } from "@app/middlewares/authMiddleware";
// import { HttpErrorHandler } from "@app/service/contract/errors/errorHandler";
// import { TodoController } from "@app/controller/todo.controller";

// const BASE_URL = "/client";
// const router = Router();

// router.post(
//   `${BASE_URL}/todos`,
//   authenticateUser,
//   HttpErrorHandler.catch(TodoController.create)
// );

// router.get(
//   `${BASE_URL}/todos`,
//   authenticateUser,
//   HttpErrorHandler.catch(TodoController.readAll)
// );

// router.get(
//   `${BASE_URL}/todos/:id`,
//   authenticateUser,
//   HttpErrorHandler.catch(TodoController.getById)
// );

// router.put(
//   `${BASE_URL}/todos/:id`,
//   authenticateUser,
//   HttpErrorHandler.catch(TodoController.update)
// );

// router.patch(
//   `${BASE_URL}/todos/:id`,
//   authenticateUser,
//   HttpErrorHandler.catch(TodoController.update)
// );

// router.delete(
//   `${BASE_URL}/todos/:id`,
//   authenticateUser,
//   HttpErrorHandler.catch(TodoController.delete)
// );

// // router.post(
// //   `${BASE_URL}/todos`,
// //   authenticateUser,
// //   HttpErrorHandler.catch(TodoController.create)
// // );

// // router.post(`${BASE_URL}/signup`, validate(signupValidationSchema), signup);

// export const clientRouter = router;
