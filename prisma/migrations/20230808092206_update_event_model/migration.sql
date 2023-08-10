/*
  Warnings:

  - Added the required column `link_photo` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "link_photo" TEXT NOT NULL;
