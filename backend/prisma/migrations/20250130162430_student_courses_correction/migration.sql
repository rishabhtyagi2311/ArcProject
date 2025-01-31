/*
  Warnings:

  - Added the required column `StudentId` to the `StudentCourses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentCourses" ADD COLUMN     "StudentId" INTEGER NOT NULL;
