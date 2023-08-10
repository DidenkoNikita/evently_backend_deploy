-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cite" TEXT NOT NULL,
    "cite_link" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);
