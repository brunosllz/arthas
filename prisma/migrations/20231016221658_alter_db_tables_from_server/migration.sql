/*
  Warnings:

  - You are about to drop the column `content` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `requirementContent` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `requirementPeriodAmount` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `requirementPeriodIdentifier` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slugProfile]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `linkTo` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingOccurredTime` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingType` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MEETING_TYPE" AS ENUM ('daily', 'weekly', 'monthly');

-- CreateEnum
CREATE TYPE "NOTIFICATION_TYPE" AS ENUM ('message', 'action', 'interaction', 'info');

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_projectId_fkey";

-- DropForeignKey
ALTER TABLE "AnswerComment" DROP CONSTRAINT "AnswerComment_answerId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectRole" DROP CONSTRAINT "ProjectRole_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_projectId_fkey";

-- DropIndex
DROP INDEX "User_userName_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "content",
ADD COLUMN     "ctaTitle" TEXT[],
ADD COLUMN     "linkTo" TEXT NOT NULL,
ADD COLUMN     "type" "NOTIFICATION_TYPE" NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "requirementContent",
DROP COLUMN "requirementPeriodAmount",
DROP COLUMN "requirementPeriodIdentifier",
ADD COLUMN     "meetingDate" TEXT,
ADD COLUMN     "meetingOccurredTime" TEXT NOT NULL,
ADD COLUMN     "meetingType" "MEETING_TYPE" NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "occupation",
DROP COLUMN "userName",
ADD COLUMN     "aboutMe" TEXT,
ADD COLUMN     "overallRate" DECIMAL(5,2) NOT NULL DEFAULT 0.0,
ADD COLUMN     "profileUrl" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "seniority" TEXT,
ADD COLUMN     "slugProfile" TEXT,
ADD COLUMN     "title" TEXT;

-- DropEnum
DROP TYPE "PERIOD_IDENTIFIER";

-- CreateTable
CREATE TABLE "InterestedInProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterestedInProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_profileUrl_key" ON "User"("profileUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_slugProfile_key" ON "User"("slugProfile");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerComment" ADD CONSTRAINT "AnswerComment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD CONSTRAINT "ProjectRole_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestedInProject" ADD CONSTRAINT "InterestedInProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestedInProject" ADD CONSTRAINT "InterestedInProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
