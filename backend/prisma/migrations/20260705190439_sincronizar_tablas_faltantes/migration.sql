-- CreateTable
CREATE TABLE "Contacto" (
    "id" SERIAL NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);
