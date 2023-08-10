/*
  Warnings:

  - You are about to drop the `subscribe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "subscribe";

-- CreateTable
CREATE TABLE "subscription" (
    "id" SERIAL NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);
