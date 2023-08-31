/*
  Warnings:

  - Added the required column `fromUserId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('RECEIVE_MONEY', 'SENT_MONEY', 'DEPOSIT_MONEY', 'MESSAGE');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "fromUserId" INTEGER NOT NULL,
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "publicAddress" TEXT NOT NULL,
    "amountSpent" DOUBLE PRECISION NOT NULL,
    "amountRecieved" DOUBLE PRECISION NOT NULL,
    "blockchainNetworkTx" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_orderId_key" ON "Deposit"("orderId");
