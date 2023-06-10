/*
  Warnings:

  - The primary key for the `lessons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `categoryId` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryEnum" AS ENUM ('development', 'bussiness', 'finance', 'design', 'marketing', 'health_and_fitness');

-- CreateEnum
CREATE TYPE "SubCategoryEnum" AS ENUM ('web_development', 'mobile_development', 'programming_languages', 'game_development', 'software_testing', 'entrepreneurship', 'communication', 'management', 'sales', 'strategy', 'accounting', 'cyprocurrency', 'finance', 'analysys', 'investing', 'web_design', 'graphic_design', 'design_tools', 'game_design', 'digital_marketing', 'seo', 'social_media_marketing', 'branding', 'fitness', 'general_health', 'sports', 'nutrition');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "lessons_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "lessons_id_seq";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" "CategoryEnum" NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
