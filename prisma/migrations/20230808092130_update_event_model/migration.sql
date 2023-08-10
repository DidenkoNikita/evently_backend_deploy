/*
  Warnings:

  - You are about to drop the column `address` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `cite` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `cite_link` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "address",
DROP COLUMN "cite",
DROP COLUMN "cite_link",
DROP COLUMN "phone";
