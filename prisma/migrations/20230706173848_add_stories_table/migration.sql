-- CreateTable
CREATE TABLE "stories" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "stories_id_key" ON "stories"("id");
