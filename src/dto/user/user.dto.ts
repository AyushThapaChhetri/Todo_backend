import { User } from "@prisma/client";

class _UserDTO {
  single(user: User) {
    return {
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      dob: user.dob.toISOString(),
      createdAt: user.createdAt.toISOString(),
    };
  }
}
export const UserDTO = new _UserDTO();
