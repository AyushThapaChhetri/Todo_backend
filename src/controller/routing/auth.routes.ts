// import { signup } from "@controller/auth.controller";
import { signup } from "../auth.controller";
import { Router } from "express";
import { Request, Response } from "express";
import { validate } from "../../middlewares/validationMiddleware";
import { signupValidationSchema } from "../validation/auth.validation";

const router = Router();

// Root route inside routing folder
// router.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to the API!");
// });

// Define the signup route
router.post("/signup", validate(signupValidationSchema), signup);

export default router;
