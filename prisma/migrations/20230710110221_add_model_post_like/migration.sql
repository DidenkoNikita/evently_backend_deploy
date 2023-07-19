-- CreateTable
CREATE TABLE "post_like" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "like" BOOLEAN NOT NULL,

    CONSTRAINT "post_like_pkey" PRIMARY KEY ("id")
);
