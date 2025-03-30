import prisma from "@app/config/db.config";
import { BadRequestError } from "../contract/errors/errors";
import Hash from "src/libs/Hash";
import { UserRepository } from "src/repository/auth/register.repository";
import * as jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_SECRET } from "@app/config/config";
import RefreshTokenRepository from "@app/repository/auth/refreshToken.repository";

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
      const accessToken = jwt.sign(
        {
          userId: user.uid,
        },
        JWT_SECRET,
        { expiresIn: "15m", algorithm: "HS256" }
      );

      //Generate refresh Token
      const refreshToken = crypto.randomBytes(64).toString("hex");
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await RefreshTokenRepository.create(user.id, refreshToken, expiresAt);

      return { user, accessToken, refreshToken };
    }
  }

  async refreshToken(refreshToken: string) {
    console.log("Received refresh token request for:", refreshToken);
    const tokenRecord = await RefreshTokenRepository.findByToken(refreshToken);

    if (!tokenRecord) {
      console.log("Invalid Refresh Token", tokenRecord);
      throw new BadRequestError("Invalid Refresh Token ");
    }
    console.log("Token found:", tokenRecord);

    if (tokenRecord.expiresAt < new Date()) {
      console.log("Refresh Token Expired");
      await RefreshTokenRepository.deleteByToken(refreshToken);
      throw new BadRequestError("Refresh token expired");
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenRecord.userId },
    });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    console.log("Generating new access token...");
    // Generate new access token
    const newAccessToken = jwt.sign({ userId: user.uid }, JWT_SECRET, {
      expiresIn: "15m",
      algorithm: "HS256",
    });

    console.log("Generating new refresh token...");
    // Refresh token rotation: invalidate old token, issue new one
    const newRefreshToken = crypto.randomBytes(64).toString("hex");
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    console.log("Deleting old refresh token...");
    await RefreshTokenRepository.deleteByToken(refreshToken);

    console.log("Storing new refresh token...");
    await RefreshTokenRepository.create(user.id, newRefreshToken, newExpiresAt);

    console.log("New tokens generated successfully");
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async deleteRefreshtoken(refreshToken: string) {
    await RefreshTokenRepository.deleteByToken(refreshToken);
  }
}
export const AuthService = new _AuthService();
