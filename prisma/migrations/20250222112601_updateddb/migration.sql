/*
  Warnings:

  - You are about to drop the `Salle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_salleID_fkey`;

-- DropIndex
DROP INDEX `Reservation_salleID_fkey` ON `Reservation`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `workshours` INTEGER NULL;

-- DropTable
DROP TABLE `Salle`;

-- CreateTable
CREATE TABLE `Workspace` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `departement` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `available` INTEGER NULL,
    `floor` INTEGER NULL,
    `capacity` INTEGER NULL,
    `expired` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_resrvation` INTEGER NOT NULL,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_salleID_fkey` FOREIGN KEY (`salleID`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendence` ADD CONSTRAINT `Attendence_id_resrvation_fkey` FOREIGN KEY (`id_resrvation`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
