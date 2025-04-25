import BaseController from "./contract/baseController.contract";
import UserService from "../repository/user/user.repository";
import { Request, Response } from "express";
import { BadRequestError } from "@app/service/contract/errors/errors";
import { UserDTO } from "@app/dto/user/user.dto";

class _UserController extends BaseController {
  async getProfile(req: Request, res: Response) {
    const id = req.user.id;
    const userProfile = await UserService.findById(id);
    if (!userProfile) {
      throw new BadRequestError("User not found or not authenticated");
    }

    const { fullName, email, gender, dob } = userProfile;

    return super.getOk({
      message: "Profile Fetch Successful",
      data: UserDTO.single(req.user),
    });
  }
}

export const UserController = new _UserController();
