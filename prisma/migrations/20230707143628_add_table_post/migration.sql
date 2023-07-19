-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "link_photo" TEXT NOT NULL,
    "link_avatar" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);
