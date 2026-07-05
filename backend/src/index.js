const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// CORS: permite tu frontend de Vercel y desarrollo local
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL  // la URL de Vercel, la definiremos en Render
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Permite requests sin origin (Postman, apps móviles) y los de la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(null, true) // por ahora permisivo; puedes endurecerlo luego
    }
  }
}))

app.use(express.json({ limit: '10mb' }))

// Rutas
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/hero', require('./routes/hero.routes'))
app.use('/api/nosotros', require('./routes/nosotros.routes'))
app.use('/api/servicios', require('./routes/servicios.routes'))
app.use('/api/proyectos', require('./routes/proyectos.routes'))
app.use('/api/contacto', require('./routes/contacto.routes'))
app.use('/api/imagenes', require('./routes/imagenes.routes'))
app.use('/api/configuracion', require('./routes/configuracion.routes'))
app.use('/api/valores', require('./routes/valores.routes'))
app.use('/api/porque', require('./routes/porque.routes'))
app.use('/api/contador', require('./routes/contador.routes'))
app.use('/api/whatsapp', require('./routes/whatsapp.routes'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HeatFluix API corriendo 🔥' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})