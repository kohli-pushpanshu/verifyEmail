/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `forgotPasswordToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgotPasswordTokenExpiry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyTokenExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "forgotPasswordToken" TEXT NOT NULL,
ADD COLUMN     "forgotPasswordTokenExpiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerfied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "verifyToken" TEXT NOT NULL,
ADD COLUMN     "verifyTokenExpiry" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
