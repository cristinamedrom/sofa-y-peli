/*
  Warnings:

  - You are about to drop the column `Score` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `MovieScore` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `score` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MovieScore" DROP CONSTRAINT "MovieScore_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieScore" DROP CONSTRAINT "MovieScore_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Score",
ADD COLUMN     "score" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MovieScore";
