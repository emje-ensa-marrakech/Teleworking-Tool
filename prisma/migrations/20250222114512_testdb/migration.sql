/*
  Warnings:

  - You are about to drop the column `salleID` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `workspaceID` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_salleID_fkey`;

-- DropIndex
DROP INDEX `Reservation_salleID_fkey` ON `Reservation`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `salleID`,
    ADD COLUMN `workspaceID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_workspaceID_fkey` FOREIGN KEY (`workspaceID`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
