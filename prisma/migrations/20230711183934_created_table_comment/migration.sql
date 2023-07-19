-- AlterTable
ALTER TABLE "user" ADD COLUMN     "link_avatar" TEXT;

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "like" INTEGER[],

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);
