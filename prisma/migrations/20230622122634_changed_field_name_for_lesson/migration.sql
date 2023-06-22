/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `resourcePath` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "videoUrl",
ADD COLUMN     "resourcePath" TEXT NOT NULL;
