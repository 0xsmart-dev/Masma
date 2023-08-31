/*
  Warnings:

  - You are about to drop the column `realAmount` on the `Transfer` table. All the data in the column will be lost.
  - Added the required column `token` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "realAmount",
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "transactionHash" TEXT;

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "logoUrl" TEXT,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);
