import BaseController from "./contract/baseController.contract";
import { Request as ExRequest } from "express";
import { BadRequestError } from "@app/service/contract/errors/errors";
import { UserDTO } from "../dto/user/user.dto";
import {
  Get,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { ValidationErrorResponse } from "../dto/Error/ValidationErrorResponse.dto";
import { BadRequestErrorResponse } from "../dto/Error/BadRequestErrorResponse.dto";
import userService from "@app/service/user/user.service";

@Response<ValidationErrorResponse>(422, "Validation failed")
@Response<BadRequestErrorResponse>(400, "BadRequestError")
@Route("api/user")
@Tags("User")
export class _UserController extends BaseController {
  @Security("jwt")
  @SuccessResponse("200", "User info fetched successfully")
  @Get("me")
  async getProfile(@Request() request: ExRequest) {
    const id = request.user.id;
    const userProfile = await userService.getCurrentUser(id);
    if (!userProfile) {
      throw new BadRequestError("User not found or not authenticated");
    }

    const { fullName, email, gender, dob } = userProfile;

    return super.getOk({
      message: "Profile Fetch Successful",
      data: UserDTO.single(request.user),
    });
  }
}

// export const UserController = new _UserController();
