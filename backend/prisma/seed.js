const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // HERO
  const heroExiste = await prisma.hero.findFirst()
  if (!heroExiste) {
    await prisma.hero.create({
      data: {
        badge: 'Especialistas en Intercambio Térmico',
        titulo: 'Soluciones Integrales en Reparación, Mantenimiento y Fabricación',
        subtitulo: 'Brindamos servicios especializados con altos estándares de calidad, seguridad y eficiencia para la industria peruana e internacional.',
        stat1: 200, stat2: 15, stat3: 98, stat4: 50
      }
    })
    console.log('✓ Hero creado')
  }

  // NOSOTROS
  const nosotrosExiste = await prisma.nosotros.findFirst()
  if (!nosotrosExiste) {
    await prisma.nosotros.create({
      data: {
        descripcion1: 'Somos una empresa metalmecánica especializada en la reparación, mantenimiento técnico y fabricación de equipos de intercambio térmico. Contamos con un equipo técnico altamente capacitado y tecnología para brindar soluciones eficientes y confiables a la industria.',
        descripcion2: 'Trabajamos bajo estrictos protocolos de calidad y seguridad, cumpliendo normas nacionales e internacionales en cada proyecto que emprendemos.',
        aniosExp: 15
      }
    })
    console.log('✓ Nosotros creado')
  }

  // CONTACTO
  const contactoExiste = await prisma.contacto.findFirst()
  if (!contactoExiste) {
    await prisma.contacto.create({
      data: {
        telefono: '+51 923 619 993',
        email: 'heatfluix@gmail.com',
        direccion: 'Lima, Perú'
      }
    })
    console.log('✓ Contacto creado')
  }

  // CONFIGURACIÓN
  const configExiste = await prisma.configuracion.findFirst()
  if (!configExiste) {
    await prisma.configuracion.create({ data: {} })
    console.log('✓ Configuración creada')
  }

  // SERVICIOS
  const serviciosCount = await prisma.servicio.count()
  if (serviciosCount === 0) {
    await prisma.servicio.createMany({
      data: [
        { numero: '01', titulo: 'Reparación', descripcion: 'Recuperación de equipos de intercambio térmico, cambio de tubos, soldadura especializada, pruebas y más.', features: ['Diagnóstico técnico completo', 'Cambio de tubos y placas', 'Soldadura especializada', 'Pruebas de presión'], orden: 1 },
        { numero: '02', titulo: 'Mantenimiento', descripcion: 'Mantenimiento preventivo y correctivo para maximizar la vida útil y eficiencia de sus equipos térmicos.', features: ['Inspección periódica', 'Limpieza y desincrostación', 'Reporte técnico detallado'], orden: 2 },
        { numero: '03', titulo: 'Fabricación', descripcion: 'Fabricación de intercambiadores de calor y equipos a medida, según normas y requerimientos del cliente.', features: ['Diseño según TEMA / ASME', 'Materiales certificados', 'Control dimensional y de calidad', 'Entrega con documentación técnica'], orden: 3 },
      ]
    })
    console.log('✓ Servicios creados')
  }

  // PROYECTOS
  const proyectosCount = await prisma.proyecto.count()
  if (proyectosCount === 0) {
    await prisma.proyecto.createMany({
      data: [
        { emoji: '🔩', categoria: 'Fabricación', titulo: 'Intercambiador Shell & Tube', ubicacion: 'Refinería La Pampilla, Lima', orden: 1 },
        { emoji: '⚙️', categoria: 'Reparación', titulo: 'Mantenimiento Planta Petroquímica', ubicacion: 'Talara, Piura', orden: 2 },
        { emoji: '🏗️', categoria: 'Mantenimiento', titulo: 'Condensadores Industriales', ubicacion: 'Callao, Lima', orden: 3 },
        { emoji: '🔥', categoria: 'Fabricación', titulo: 'Calderín Recuperador de Calor', ubicacion: 'Ilo, Moquegua', orden: 4 },
        { emoji: '⚗️', categoria: 'Reparación', titulo: 'Reparación Enfriadores Gas', ubicacion: 'Camisea, Cusco', orden: 5 },
      ]
    })
    console.log('✓ Proyectos creados')
  }

  // VALORES NOSOTROS
  const valoresCount = await prisma.valorNosotros.count()
  if (valoresCount === 0) {
    await prisma.valorNosotros.createMany({
      data: [
        { icono: '🏆', titulo: 'Calidad Garantizada', desc: 'Procesos certificados bajo normas internacionales', orden: 1 },
        { icono: '👷', titulo: 'Equipo Profesional', desc: 'Ingenieros y técnicos especializados', orden: 2 },
        { icono: '⏱️', titulo: 'Cumplimiento de Plazos', desc: 'Entregamos cada proyecto en tiempo y forma', orden: 3 },
        { icono: '🛡️', titulo: 'Seguridad Primero', desc: 'Protocolos de seguridad en todas nuestras labores', orden: 4 },
      ]
    })
    console.log('✓ Valores creados')
  }

  // POR QUÉ ELEGIRNOS
  const porqueCount = await prisma.porque.count()
  if (porqueCount === 0) {
    await prisma.porque.createMany({
      data: [
        { icono: '👷', titulo: 'Equipo Especializado', desc: 'Profesionales con formación técnica e ingeniería metalmecánica y amplia experiencia en campo.', orden: 1 },
        { icono: '🔬', titulo: 'Tecnología Avanzada', desc: 'Equipos y herramientas de última generación para diagnóstico, fabricación y pruebas no destructivas.', orden: 2 },
        { icono: '✅', titulo: 'Calidad Certificada', desc: 'Trabajamos bajo normas nacionales e internacionales ASME, TEMA y AWS en cada proyecto.', orden: 3 },
        { icono: '🛡️', titulo: 'Seguridad Absoluta', desc: 'Estrictos protocolos de seguridad industrial en cada etapa de nuestros servicios y proyectos.', orden: 4 },
      ]
    })
    console.log('✓ Por qué elegirnos creados')
  }

  // CONTADORES
  const contadorCount = await prisma.contador.count()
  if (contadorCount === 0) {
    await prisma.contador.createMany({
      data: [
        { numero: 200, suffix: '+', label: 'Proyectos completados', orden: 1 },
        { numero: 50, suffix: '+', label: 'Clientes satisfechos', orden: 2 },
        { numero: 15, suffix: '', label: 'Años en el mercado', orden: 3 },
        { numero: 98, suffix: '%', label: 'Tasa de satisfacción', orden: 4 },
      ]
    })
    console.log('✓ Contadores creados')
  }

// WHATSAPP CONFIG
  const waConfigExiste = await prisma.whatsappConfig.findFirst()
  if (!waConfigExiste) {
    await prisma.whatsappConfig.create({ data: {} })
    console.log('✓ WhatsApp config creada')
  }

  // WHATSAPP CONTACTOS
  const waContactosCount = await prisma.whatsappContacto.count()
  if (waContactosCount === 0) {
    await prisma.whatsappContacto.createMany({
      data: [
        { nombre: 'Lupita', cargo: 'Director general', numero: '51999999999', color: '#FF6B1A', orden: 1 },
        { nombre: 'Lupito', cargo: 'Director Ambiental', numero: '51999999999', color: '#29B6D8', orden: 2 },
      ]
    })
    console.log('✓ WhatsApp contactos creados')
  }

  console.log('🌱 Seed completado')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })