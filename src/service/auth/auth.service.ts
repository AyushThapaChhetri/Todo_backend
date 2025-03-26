import prisma from "@app/config/db.config";
import { BadRequestError } from "../contract/errors/errors";
import Hash from "src/libs/Hash";
import { UserRepository } from "src/repository/auth/register.repository";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "@app/config/config";

class _AuthService {
  async register(params: {
    email: string;
    password: string;
    fullName: string;
    gender: string;
    dob: Date;
  }) {
    const { email, password, dob, fullName, gender } = params;
    // First check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Send error response and stop execution
      throw new BadRequestError("Email already exists");
    }

    const hashedPassword = await Hash.createHash(password);

    return UserRepository.create({
      email,
      password: hashedPassword,
      dob,
      fullName,
      gender,
    });
  }

  async login(params: { email: string; password: any }) {
    const { email, password } = params;

    let user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      console.log("Email donesn't exists: ", email);
      throw new BadRequestError("Email donesn't exists: ", email);
      // throw
    }
    // console.log(password, user.password);
    const comparePassword = await Hash.compareHash(password, user.password);

    if (!comparePassword) {
      // console.log("Incorrect password: ", user);
      throw new BadRequestError("Incorrect Password");
    } else {
      // console.log("Login successful for:", email);
      const token = jwt.sign(
        {
          userId: user.uid,
        },
        JWT_SECRET,
        { expiresIn: 84600, algorithm: "HS256" }
      );
      return { user, token };
    }
  }
}
export const AuthService = new _AuthService();
