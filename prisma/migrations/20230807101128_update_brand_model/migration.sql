/*
  Warnings:

  - You are about to drop the column `addres` on the `brand` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brand" DROP COLUMN "addres",
ADD COLUMN     "address" TEXT;
