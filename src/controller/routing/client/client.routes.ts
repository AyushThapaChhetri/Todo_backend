// import { signup } from "@controller/auth.controller";
import { Router } from "express";
import { Request, Response } from "express";
import { validate_schemas } from "../../../middlewares/validationMiddleware";
import { signupValidationSchema } from "../../validation/auth.validation";

const BASE_URL = "/client";
const router = Router();

// router.post(`${BASE_URL}/signup`, validate(signupValidationSchema), signup);

export const clientRouter = router;
