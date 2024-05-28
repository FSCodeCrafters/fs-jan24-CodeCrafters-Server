/*
  Warnings:

  - The `productIds` column on the `Favorites` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "productIds",
ADD COLUMN     "productIds" INTEGER[];
