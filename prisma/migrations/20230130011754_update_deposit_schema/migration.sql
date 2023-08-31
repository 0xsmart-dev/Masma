/*
  Warnings:

  - You are about to drop the column `amountRecieved` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `amountSpent` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `blockchainNetworkTx` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Deposit` table. All the data in the column will be lost.
  - You are about to drop the column `publicAddress` on the `Deposit` table. All the data in the column will be lost.
  - The `status` column on the `Deposit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `amount` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionHash` to the `Deposit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Deposit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DepositStatusType" AS ENUM ('PENDING', 'COMPLETED');

-- DropIndex
DROP INDEX "Deposit_orderId_key";

-- AlterTable
ALTER TABLE "Deposit" DROP COLUMN "amountRecieved",
DROP COLUMN "amountSpent",
DROP COLUMN "blockchainNetworkTx",
DROP COLUMN "orderId",
DROP COLUMN "publicAddress",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "transactionHash" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "DepositStatusType" NOT NULL DEFAULT 'COMPLETED';

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_walletAddress_fkey" FOREIGN KEY ("walletAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
