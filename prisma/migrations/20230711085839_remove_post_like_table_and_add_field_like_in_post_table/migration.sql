/*
  Warnings:

  - You are about to drop the `post_like` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "like" INTEGER[];

-- DropTable
DROP TABLE "post_like";
