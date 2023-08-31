-- DropIndex
DROP INDEX "User_issuer_key";

-- DropIndex
DROP INDEX "User_publicAddress_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "issuer" DROP NOT NULL,
ALTER COLUMN "publicAddress" DROP NOT NULL;
