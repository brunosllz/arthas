/*
  Warnings:

  - You are about to drop the column `content` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `requirementTimeAmount` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `requirementTimeIdentifier` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `ProjectRole` table. All the data in the column will be lost.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirementPeriodAmount` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirementPeriodIdentifier` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membersAmount` to the `ProjectRole` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PERIOD_IDENTIFIER" AS ENUM ('day', 'week', 'month');

-- CreateEnum
CREATE TYPE "PROJECT_STATUS" AS ENUM ('draft', 'recruiting', 'closed');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "content",
DROP COLUMN "requirementTimeAmount",
DROP COLUMN "requirementTimeIdentifier",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "requirementPeriodAmount" INTEGER NOT NULL,
ADD COLUMN     "requirementPeriodIdentifier" "PERIOD_IDENTIFIER" NOT NULL,
ADD COLUMN     "status" "PROJECT_STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "ProjectRole" DROP COLUMN "amount",
ADD COLUMN     "membersAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- DropEnum
DROP TYPE "TIME_IDENTIFIER";
