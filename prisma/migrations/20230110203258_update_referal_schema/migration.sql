/*
  Warnings:

  - You are about to drop the column `Accepted` on the `Referal` table. All the data in the column will be lost.
  - You are about to drop the column `inviteLink` on the `Referal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Referal` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Referal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referal" DROP COLUMN "Accepted",
DROP COLUMN "inviteLink",
DROP COLUMN "userId",
ADD COLUMN     "referredBy" TEXT,
ADD COLUMN     "userEmail" TEXT NOT NULL;
