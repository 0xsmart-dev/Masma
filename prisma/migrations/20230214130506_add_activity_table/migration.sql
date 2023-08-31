-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('SIGN_UP', 'FOLLOW', 'UNFOLLOW', 'TRANSFER', 'DEPOSIT', 'ACCEPT_INVITE');

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "activityContent" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
