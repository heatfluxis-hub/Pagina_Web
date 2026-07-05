-- CreateTable
CREATE TABLE "Configuracion" (
    "id" SERIAL NOT NULL,
    "nombreEmpresa" TEXT NOT NULL DEFAULT 'HEATFLUIX',
    "sublema" TEXT NOT NULL DEFAULT 'INDUSTRIAL SOLUTIONS',
    "logoId" INTEGER,
    "footerDesc" TEXT NOT NULL DEFAULT 'Especialistas en reparación, mantenimiento y fabricación de equipos de intercambio térmico para la industria.',
    "copyright" TEXT NOT NULL DEFAULT '© 2024 HeatFluix Industrial Solutions SAC. Todos los derechos reservados.',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "facebook" TEXT NOT NULL DEFAULT '',
    "whatsapp" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Configuracion_pkey" PRIMARY KEY ("id")
);
