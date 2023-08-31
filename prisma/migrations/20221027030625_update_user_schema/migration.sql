/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[issuer]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issuer` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "username",
DROP COLUMN "walletAddress",
ADD COLUMN     "issuer" TEXT NOT NULL,
ADD COLUMN     "oauthProvider" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "publicAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_issuer_key" ON "User"("issuer");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicAddress_key" ON "User"("publicAddress");
