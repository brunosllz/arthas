/*
  Warnings:

  - You are about to drop the `_TechnologyToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TechnologyToUser" DROP CONSTRAINT "_TechnologyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TechnologyToUser" DROP CONSTRAINT "_TechnologyToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboard" TIMESTAMP(3);

-- DropTable
DROP TABLE "_TechnologyToUser";

-- CreateTable
CREATE TABLE "skill" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToskill" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "skill_slug_key" ON "skill"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToskill_AB_unique" ON "_UserToskill"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToskill_B_index" ON "_UserToskill"("B");

-- AddForeignKey
ALTER TABLE "_UserToskill" ADD CONSTRAINT "_UserToskill_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToskill" ADD CONSTRAINT "_UserToskill_B_fkey" FOREIGN KEY ("B") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
