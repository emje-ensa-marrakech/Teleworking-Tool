-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `departement` VARCHAR(191) NULL,
    ADD COLUMN `floor` VARCHAR(191) NULL,
    ADD COLUMN `workspaceName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Workspace` ADD COLUMN `workspaceName` VARCHAR(191) NULL;
