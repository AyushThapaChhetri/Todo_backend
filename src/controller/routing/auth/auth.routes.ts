// import { signup } from "@controller/auth.controller";
import { NextFunction, Router } from "express";
import { validate_schemas } from "../../../middlewares/validationMiddleware";
import {
  refreshTokenValidationSchema,
  signupValidationSchema,
} from "../../validation/auth.validation";
import { loginValidationSchema } from "../../validation/auth.validation";
import { AuthController } from "src/controller/auth.controller";
import { HttpErrorHandler } from "src/service/contract/errors/errorHandler";
import { authenticateUser } from "@app/middlewares/authMiddleware";

const BASE_URL = "/auth";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - gender
 *         - dob
 *         - createdAt
 *       properties:
 *         fullName:
 *           type: string
 *           description: The full name of the user.
 *           example: Hero Kumar
 *         email:
 *           type: string
 *           format: email
 *           description: User email address.
 *           example: hero@gmail.com
 *         gender:
 *           type: string
 *           description: User gender.
 *           example: male
 *         dob:
 *           type: string
 *           format: date
 *           description: User date of birth.
 *           example: 2000-01-15
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp.
 *           example: 2025-04-24T08:30:00Z
 *
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - confirmPassword
 *               - gender
 *               - dob
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Hero Kumar
 *               emailName:
 *                 type: string
 *                 format: email
 *                 example: hero@gmail.com
 *               emailPassword:
 *                 type: string
 *                 example: lafsU*sdf9dl
 *               emailConfirmPassword:
 *                 type: string
 *                 example: lafsU*sdf9dl
 *               gender:
 *                 type: string
 *                 example: male
 *               emailDob:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-15
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input (missing or incorrect fields)
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email already exists
 *       422:
 *         description: Validation error from Yup schema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: password
 *                       message:
 *                         type: string
 *                         example: Password must contain at least one special character
 *       500:
 *         description: Internal server error
 */

// Define the signup route
router.post(
  `${BASE_URL}/signup`,
  validate_schemas(signupValidationSchema),
  HttpErrorHandler.catch(AuthController.signup)
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               emailName:
 *                 type: string
 *                 format: email
 *                 example: hero@gmail.com
 *               emailPassword:
 *                 type: string
 *                 example: lafsU*sdf9dl
 *               emailRemember:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid input (e.g., missing email or password)
 *       401:
 *         description: Unauthorized (wrong password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       422:
 *         description: Validation error from Yup schema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: Email must be a valid email
 *       500:
 *         description: Internal server error
 */

router.post(
  `${BASE_URL}/login`,
  validate_schemas(loginValidationSchema),
  HttpErrorHandler.catch(AuthController.login)
);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Validate and Refresh JWT Token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to validate and renew access.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   description: New refresh token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid refresh token or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid refresh token
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: refreshToken
 *                       message:
 *                         type: string
 *                         example: Refresh token is required
 *       500:
 *         description: Internal server error
 */

router.post(
  `${BASE_URL}/refresh`,
  validate_schemas(refreshTokenValidationSchema),
  HttpErrorHandler.catch(AuthController.refresh)
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     description: Invalidate the user's refresh token to log them out.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token issued during login.
 *                 example: eyJhbGciOiJIUzI1NiIsInR...
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged out successfully
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: refreshToken
 *                       message:
 *                         type: string
 *                         example: Refresh token is required
 *       500:
 *         description: Internal server error
 */

router.post(
  `${BASE_URL}/logout`,
  validate_schemas(refreshTokenValidationSchema),
  HttpErrorHandler.catch(AuthController.logout)
);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the authenticated user's profile using a valid Bearer token.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMTRmNmFiZS0yYWMwLTRjOTYtYWNhYi1iZjEyYmUzN2MzMjgiLCJpYXQiOjE3NDU0OTM3OTEsImV4cCI6MTc0NTQ5NDY5MX0.dRKozzg2mr_yIm8OQ0Lhuk0qZbbvERLY0oij4X0ZxakeyJ1c2VySWQiOiJmMTRmNmFiZS0yYWMwLTRjOTYtYWNhYi1iZjEyYmUzN2MzMjgiLCJpYXQiOjE3NDU0ODgzNTIsImV4cCI6MTc0NTQ4OTI1Mn0.5wP_4xZvmL6YgL0DSDfb3eYa4ijnvGVaCRnVOsrBlWA
 *         description: Bearer access token
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   description: The user's full name
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                   example: johndoe@example.com
 *                 gender:
 *                   type: string
 *                   description: The user's gender
 *                   example: male
 *                 dob:
 *                   type: string
 *                   format: date
 *                   description: The user's date of birth
 *                   example: 1990-01-01
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time the user account was created
 *                   example: 2023-10-15T14:48:00.000Z
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get(
  `${BASE_URL}/me`,
  authenticateUser,
  HttpErrorHandler.catch(AuthController.me)
);
// authenticateUser,

export const authRouter = router;
