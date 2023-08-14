/*
  Warnings:

  - You are about to drop the column `link_photo` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `post_name` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "link_photo",
DROP COLUMN "post_name",
ALTER COLUMN "text" DROP NOT NULL;
