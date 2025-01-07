-- CreateTable
CREATE TABLE "user_Instructor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "user_Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Instructor_email_key" ON "user_Instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_Instructor_password_key" ON "user_Instructor"("password");

-- CreateIndex
CREATE UNIQUE INDEX "user_Instructor_username_key" ON "user_Instructor"("username");
