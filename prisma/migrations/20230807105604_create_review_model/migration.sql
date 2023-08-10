-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);
