import { User } from "@prisma/client";

class _UserDTO {
  single(user: User) {
    return {
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
      createdAt: user.createdAt,
    };
  }
}
export const UserDTO = new _UserDTO();
