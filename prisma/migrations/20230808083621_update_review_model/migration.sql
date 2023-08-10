/*
  Warnings:

  - Added the required column `brand_id` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" ADD COLUMN     "brand_id" INTEGER NOT NULL;
