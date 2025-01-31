-- CreateTable
CREATE TABLE "StudentCourses" (
    "id" SERIAL NOT NULL,
    "roomName" TEXT NOT NULL,
    "members" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "StudentCourses_pkey" PRIMARY KEY ("id")
);
