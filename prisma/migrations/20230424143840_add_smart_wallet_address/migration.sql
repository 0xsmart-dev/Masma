/*
  Warnings:

  - You are about to drop the column `walletAddress` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `publicAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[magicWalletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[smartWalletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magicWalletAddress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smartWalletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deposit" DROP CONSTRAINT "Deposit_walletAddress_fkey";

-- DropIndex
DROP INDEX "User_walletAddress_key";

-- AlterTable
ALTER TABLE "Deposit" DROP COLUMN "walletAddress",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "nickname",
DROP COLUMN "publicAddress",
DROP COLUMN "walletAddress",
ADD COLUMN     "magicWalletAddress" TEXT NOT NULL,
ADD COLUMN     "smartWalletAddress" TEXT NOT NULL,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_magicWalletAddress_key" ON "User"("magicWalletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_smartWalletAddress_key" ON "User"("smartWalletAddress");

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_address_fkey" FOREIGN KEY ("address") REFERENCES "User"("smartWalletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
