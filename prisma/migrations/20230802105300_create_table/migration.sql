-- AlterTable
ALTER TABLE "user" ADD COLUMN     "friends_id" INTEGER[];

-- CreateTable
CREATE TABLE "request_for_friendship" (
    "id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "request_for_friendship_pkey" PRIMARY KEY ("id")
);
