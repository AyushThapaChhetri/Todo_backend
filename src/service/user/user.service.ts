import UserRepository from "../../repository/user/user.repository";
import { BadRequestError } from "../contract/errors/errors";

class _UserService {
  async getCurrentUser(id: number) {
    const userProfile = await UserRepository.findById(id);
    console.log("Profile from service: ", userProfile);
    return userProfile;
  }
}
