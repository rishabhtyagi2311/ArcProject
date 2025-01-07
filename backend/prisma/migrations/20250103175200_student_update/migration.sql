-- CreateTable
CREATE TABLE "user_Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "user_Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refreshToken_User" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refreshToken_User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Student_email_key" ON "user_Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_Student_username_key" ON "user_Student"("username");

-- AddForeignKey
ALTER TABLE "refreshToken_User" ADD CONSTRAINT "refreshToken_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
