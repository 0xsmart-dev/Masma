-- AddForeignKey
ALTER TABLE "Referal" ADD CONSTRAINT "Referal_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
