/*
  Warnings:

  - You are about to drop the column `inviteCode` on the `Referal` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Referal` table. All the data in the column will be lost.
  - Added the required column `status` to the `Referal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Referal` table without a default value. This is not possible if the table is not empty.
  - Made the column `inviteCode` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ReferalStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

-- DropForeignKey
ALTER TABLE "Referal" DROP CONSTRAINT "Referal_userEmail_fkey";

-- AlterTable
ALTER TABLE "Referal" DROP COLUMN "inviteCode",
DROP COLUMN "userEmail",
ADD COLUMN     "status" "ReferalStatus" NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "inviteCode" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Referal" ADD CONSTRAINT "Referal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
