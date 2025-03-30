import { NextFunction, Request, Response } from "express";
import BaseController from "./contract/baseController.contract";
import { AuthService } from "src/service/auth/auth.service";
import { UserDTO } from "src/dto/user/user.dto";
import { BadRequestError } from "@app/service/contract/errors/errors";
// import { BadRequestError } from "@app/service/contract/errors/errors";
// import { loginValidationSchema } from "./validation/auth.validation";
// import { validate_schemas } from "@app/middlewares/validationMiddleware";

class _AuthController extends BaseController {
  async signup(req: Request) {
    const signupData = req.body; // Data sent from frontend
    console.log("Signup Data Received:", signupData);

    // Extract fields from signupData}): Promise<{

    const {
      fullName,
      emailName: email, // Rename emailName to email to match schema
      emailPassword: password,
      gender,
      emailDob: dob,
    } = signupData;

    const user = await AuthService.register({
      email,
      password,
      dob: new Date(dob),
      fullName,
      gender,
    });

    // Send success response
    return super.postOk({
      message: "User created successfully",
      data: UserDTO.single(user),
    });
  }

  async login(req: Request, res: Response) {
    const {
      emailName: email, // Rename emailName to email to match schema
      emailPassword: password,
    } = req.body;

    try {
      const { user, accessToken, refreshToken } = await AuthService.login({
        email,
        password,
      });

      return super.postOk({
        message: "Login successful",
        data: {
          user: UserDTO.single(user), // Convert user data using UserDTO
          accessToken, // Include the generated token
          refreshToken,
        },
      });
    } catch (error) {
      // Handle error if login fails (e.g., incorrect credentials)
      if (error instanceof BadRequestError) {
        // If error is a BadRequestError, send appropriate response
        return {
          statusCode: 400,
          data: { message: error.message },
        };
      }

      // Handle other errors (if any)
      return {
        statusCode: 500,
        data: { message: "Something went wrong!" },
      };
    }

    // return super.postOk({
    //   message: "Login data received successfully",
    //   data: loginCredentials,
    // });
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new BadRequestError("Refresh token is required");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await AuthService.refreshToken(refreshToken);

    return super.postOk({
      message: "Login successful",
      data: {
        accessToken, // Include the generated token
        refreshToken: newRefreshToken,
      },
    });
  }

  async logout(req: Request, res: Response) {
    // console.log("Delete controller");
    const { refreshToken } = req.body;
    // console.log("Refresh Token", refreshToken);

    if (!refreshToken) {
      // return res.status(400).json({ error: "Refresh token is required" });
      throw new BadRequestError("Refresh token is required");
    }

    // Delete the refresh token from the database
    await AuthService.deleteRefreshtoken(refreshToken);
    // await RefreshTokenRepository.deleteByToken(refreshToken);

    // return res.status(200).json({ message: "Logged out successfully" });
    return super.postOk({
      message: "Logged out successfully",
      data: {},
    });
  }

  // /me -> return the logged in user
  async me(req: Request, res: Response, next: NextFunction) {
    // console.log(req.user!);
    if (!req.user) {
      throw new BadRequestError("User not found or not authenticated");
    }

    return super.getOk({
      message: "Profile Details Fetched successfully",
      data: UserDTO.single(req.user),
    });
  }
}

export const AuthController = new _AuthController();
