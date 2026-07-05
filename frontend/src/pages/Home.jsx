import Navbar from '../components/public/Navbar'
import Hero from '../components/public/Hero'
import Nosotros from '../components/public/Nosotros'
import Servicios from '../components/public/Servicios'
import Proyectos from '../components/public/Proyectos'
import Contador from '../components/public/Contador'
import Porque from '../components/public/Porque'
import Contacto from '../components/public/Contacto'
import Footer from '../components/public/Footer'
import WhatsappWidget from '../components/public/WhatsappWidget'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Nosotros />
      <Servicios />
      <Proyectos />
      <Contador />
      <Porque />
      <Contacto />
      <Footer />
      <WhatsappWidget />
    </div>
  )
}