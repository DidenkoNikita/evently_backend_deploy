/*
  Warnings:

  - Added the required column `link_avatar` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" ADD COLUMN     "link_avatar" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;
