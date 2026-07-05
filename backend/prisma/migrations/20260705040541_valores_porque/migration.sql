-- CreateTable
CREATE TABLE "ValorNosotros" (
    "id" SERIAL NOT NULL,
    "icono" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ValorNosotros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Porque" (
    "id" SERIAL NOT NULL,
    "icono" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Porque_pkey" PRIMARY KEY ("id")
);
