/*
  Warnings:

  - You are about to drop the `stories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "stories";

-- CreateTable
CREATE TABLE "story" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "story_pkey" PRIMARY KEY ("id")
);
