/*
  Warnings:

  - The `expired` column on the `Workspace` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `personalNumber` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Workspace` DROP COLUMN `expired`,
    ADD COLUMN `expired` DATETIME(3) NULL;
