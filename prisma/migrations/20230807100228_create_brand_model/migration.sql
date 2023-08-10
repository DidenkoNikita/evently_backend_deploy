-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addres" TEXT NOT NULL,
    "name_site" TEXT NOT NULL,
    "site_link" TEXT NOT NULL,
    "link_photo" TEXT NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);
