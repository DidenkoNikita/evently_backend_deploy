/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `post_like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_like_id_key" ON "post_like"("id");
