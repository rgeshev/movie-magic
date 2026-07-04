/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "releaseDate";

-- CreateTable
CREATE TABLE "artists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "born" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);
