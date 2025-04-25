import prisma from "../../config/db.config";

class UserRepository {
  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }
}

export default new UserRepository();
