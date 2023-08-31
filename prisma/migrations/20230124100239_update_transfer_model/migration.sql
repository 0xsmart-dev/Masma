/*
  Warnings:

  - Added the required column `fee` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realAmount` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "realAmount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
