/*
  Warnings:

  - A unique constraint covering the columns `[transactionHash]` on the table `Deposit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Deposit_transactionHash_key" ON "Deposit"("transactionHash");
