import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../DB/db.config";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const signupData = req.body; // Data sent from frontend
    console.log("Signup Data Received:", signupData);

    // Extract fields from signupData
    const {
      fullName,
      emailName: email, // Rename emailName to email to match schema
      emailPassword: password, // Rename emailPassword to password
      gender,
      emailDob: dob, // Rename emailDob to dob
    } = signupData;

    // First check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Send error response and stop execution
      res.status(400).json({
        message: "Email already exists",
      });
      return; // No TypeScript error now, and we stop execution
    }

    // Hash the password
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user in the database using Prisma
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword, // Store the hashed password
        gender,
        dob: new Date(dob), // Convert string to Date object
      },
    });

    // Send success response
    res.status(201).json({
      message: "User created successfully",
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        gender: newUser.gender,
        dob: newUser.dob,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Signup Error:", error);

    // Handle Prisma unique constraint error specifically
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      res.status(400).json({
        message: "Email already exists",
      });
      return; // Stop execution after sending response
    }

    // Handle other errors
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
