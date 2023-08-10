-- CreateTable
CREATE TABLE "phone_confidentiality" (
    "user_id" INTEGER NOT NULL,
    "all" BOOLEAN NOT NULL DEFAULT true,
    "my_friends" BOOLEAN NOT NULL DEFAULT false,
    "nobody" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "message_confidentiality" (
    "user_id" INTEGER NOT NULL,
    "all" BOOLEAN NOT NULL DEFAULT true,
    "my_friends" BOOLEAN NOT NULL DEFAULT false,
    "nobody" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "phone_confidentiality_user_id_key" ON "phone_confidentiality"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_confidentiality_user_id_key" ON "message_confidentiality"("user_id");

-- AddForeignKey
ALTER TABLE "phone_confidentiality" ADD CONSTRAINT "phone_confidentiality_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_confidentiality" ADD CONSTRAINT "message_confidentiality_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
