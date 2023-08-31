/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `profileId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_key" ON "User"("profileId");
