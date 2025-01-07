-- DropIndex
DROP INDEX "user_Instructor_password_key";

-- CreateTable
CREATE TABLE "refreshToken_Instructor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refreshToken_Instructor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refreshToken_Instructor" ADD CONSTRAINT "refreshToken_Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
