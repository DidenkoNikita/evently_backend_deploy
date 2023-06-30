-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "Role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_categories" (
    "user_id" INTEGER NOT NULL,
    "restaurants" BOOLEAN NOT NULL DEFAULT false,
    "trade_fairs" BOOLEAN NOT NULL DEFAULT false,
    "lectures" BOOLEAN NOT NULL DEFAULT false,
    "cafe" BOOLEAN NOT NULL DEFAULT false,
    "bars" BOOLEAN NOT NULL DEFAULT false,
    "sport" BOOLEAN NOT NULL DEFAULT false,
    "dancing" BOOLEAN NOT NULL DEFAULT false,
    "games" BOOLEAN NOT NULL DEFAULT false,
    "quests" BOOLEAN NOT NULL DEFAULT false,
    "concerts" BOOLEAN NOT NULL DEFAULT false,
    "parties" BOOLEAN NOT NULL DEFAULT false,
    "show" BOOLEAN NOT NULL DEFAULT false,
    "for_free" BOOLEAN NOT NULL DEFAULT false,
    "cinema" BOOLEAN NOT NULL DEFAULT false,
    "theaters" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "user_mood" (
    "user_id" INTEGER NOT NULL,
    "funny" BOOLEAN NOT NULL DEFAULT false,
    "sad" BOOLEAN NOT NULL DEFAULT false,
    "gambling" BOOLEAN NOT NULL DEFAULT false,
    "romantic" BOOLEAN NOT NULL DEFAULT false,
    "energetic" BOOLEAN NOT NULL DEFAULT false,
    "festive" BOOLEAN NOT NULL DEFAULT false,
    "calm" BOOLEAN NOT NULL DEFAULT false,
    "friendly" BOOLEAN NOT NULL DEFAULT false,
    "cognitive" BOOLEAN NOT NULL DEFAULT false,
    "dreamy" BOOLEAN NOT NULL DEFAULT false,
    "do_not_know" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "token" (
    "user_id" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_categories_user_id_key" ON "user_categories"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_mood_user_id_key" ON "user_mood"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_user_id_key" ON "token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_refresh_token_key" ON "token"("refresh_token");

-- AddForeignKey
ALTER TABLE "user_categories" ADD CONSTRAINT "user_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_mood" ADD CONSTRAINT "user_mood_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
