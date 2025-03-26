import prisma from "@app/config/db.config";
import BaseRepository from "../contract/baseRepository";

class _UserRepository extends BaseRepository {
  //INSERT INTO USER(id, email, password, fullName, gender, dob) VALUES(id, email, password, fullName, gender, dob);
  async create(params: {
    email: string;
    password: string;
    fullName: string;
    gender: string;
    dob: Date;
  }) {
    const { email, fullName, gender, password, dob } = params;
    // Create the user in the database using Prisma
    return super.dbCatch(
      prisma.user.create({
        data: {
          createdAt: new Date(),
          fullName,
          email,
          password, // Store the hashed password
          gender,
          dob, // Convert string to Date object
        },
      })
    );
  }
}
export const UserRepository = new _UserRepository();
