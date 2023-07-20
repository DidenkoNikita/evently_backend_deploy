/*
  Warnings:

  - You are about to drop the column `link_avatar` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comment" DROP COLUMN "link_avatar",
DROP COLUMN "user_name";
