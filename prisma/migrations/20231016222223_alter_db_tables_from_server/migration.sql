/*
  Warnings:

  - Made the column `slugProfile` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "slugProfile" SET NOT NULL;
