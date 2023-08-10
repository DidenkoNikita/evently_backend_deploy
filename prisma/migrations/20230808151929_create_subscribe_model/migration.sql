-- CreateTable
CREATE TABLE "subscribe" (
    "id" SERIAL NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "subscribe_pkey" PRIMARY KEY ("id")
);
