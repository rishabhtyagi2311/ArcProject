-- CreateTable
CREATE TABLE "CourseRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "members" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "CourseRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseRoom_code_key" ON "CourseRoom"("code");

-- AddForeignKey
ALTER TABLE "CourseRoom" ADD CONSTRAINT "CourseRoom_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user_Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
