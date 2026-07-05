-- CreateTable
CREATE TABLE "WhatsappConfig" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL DEFAULT 'HeatFluix',
    "estado" TEXT NOT NULL DEFAULT 'En línea · responde en minutos',
    "bienvenida" TEXT NOT NULL DEFAULT '¡Hola! 👋 Elige con quién deseas conversar y te atendemos por WhatsApp.',
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "WhatsappConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatsappContacto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#FF6B1A',
    "orden" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WhatsappContacto_pkey" PRIMARY KEY ("id")
);
