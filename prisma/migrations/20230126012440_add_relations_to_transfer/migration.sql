/*
  Warnings:

  - You are about to drop the column `from` on the `Transfer` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Transfer` table. All the data in the column will be lost.
  - Added the required column `fromId` to the `Transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "fromId" INTEGER NOT NULL,
ADD COLUMN     "toId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
