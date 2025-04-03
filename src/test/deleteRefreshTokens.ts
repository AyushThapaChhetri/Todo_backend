import prisma from "../config/db.config";

async function deleteAllRefreshTokens() {
    try {
        // Delete all refresh tokens
        const deleteCount = await prisma.refreshToken.deleteMany({});
        console.log(`Deleted ${deleteCount.count} refresh tokens.`);
    } catch (error) {
        console.error('Error deleting refresh tokens:', error);
    } finally {
        // Disconnect from the database
        await prisma.$disconnect();
    }
}

deleteAllRefreshTokens();