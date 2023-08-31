-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "body" JSONB NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
