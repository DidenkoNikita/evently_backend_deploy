-- DropForeignKey
ALTER TABLE "message_confidentiality" DROP CONSTRAINT "message_confidentiality_user_id_fkey";

-- DropForeignKey
ALTER TABLE "phone_confidentiality" DROP CONSTRAINT "phone_confidentiality_user_id_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_categories" DROP CONSTRAINT "user_categories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_mood" DROP CONSTRAINT "user_mood_user_id_fkey";
