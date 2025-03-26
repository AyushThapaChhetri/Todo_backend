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
      const { user, token } = await AuthService.login({
        email,
        password,
      });

      return super.postOk({
        message: "Login successful",
        data: {
          user: UserDTO.single(user), // Convert user data using UserDTO
          token, // Include the generated token
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
