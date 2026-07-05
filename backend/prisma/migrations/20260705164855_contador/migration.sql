/*
  Warnings:

  - You are about to drop the `Contacto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Contacto";

-- CreateTable
CREATE TABLE "Contador" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL DEFAULT 0,
    "suffix" TEXT NOT NULL DEFAULT '+',
    "label" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Contador_pkey" PRIMARY KEY ("id")
);
