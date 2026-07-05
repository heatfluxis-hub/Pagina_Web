import { useEffect, useState } from 'react'
import { useConfig } from '../admin/ConfigContext'
import { imageUrl } from '../../services/imageUrl'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { config } = useConfig()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const nombre = config?.nombreEmpresa || 'HEATFLUIX'
  const sublema = config?.sublema || 'INDUSTRIAL SOLUTIONS'
  const logo = config?.logoId ? imageUrl(config.logoId) : null

  return (
    <nav style={{ ...styles.nav, boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none' }}>
      <div style={styles.inner}>
        <div style={styles.logo}>
          {logo
            ? <img src={logo} alt="logo" style={styles.logoImg} />
            : <div style={styles.logoIcon}>HF</div>
          }
          <div>
            <span style={styles.logoText}>{nombre}</span>
            <span style={styles.logoSub}>{sublema}</span>
          </div>
        </div>
        <ul style={styles.links}>
          {['hero', 'nosotros', 'servicios', 'proyectos', 'porque'].map((id, i) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} style={styles.link}>
                {['Inicio', 'Nosotros', 'Servicios', 'Proyectos', 'Por qué elegirnos'][i]}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => scrollTo('contacto')} style={styles.btnContacto}>
          Contacto
        </button>
      </div>
    </nav>
  )
}

const styles = {
  nav: { position: 'fixed', top: 0, width: '100%', zIndex: 100, background: 'rgba(10,22,40,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(41,182,216,0.25)', transition: 'box-shadow 0.3s' },
  inner: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: '68px' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  logoIcon: { width: '40px', height: '40px', background: 'linear-gradient(135deg,#29B6D8,#FF6B1A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontFamily: 'sans-serif', fontSize: '18px', color: '#fff' },
  logoImg: { width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' },
  logoText: { fontFamily: 'sans-serif', fontSize: '22px', fontWeight: '700', color: '#fff', letterSpacing: '1px', display: 'block' },
  logoSub: { fontSize: '9px', color: '#29B6D8', letterSpacing: '3px', display: 'block', marginTop: '-4px' },
  links: { display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 },
  link: { background: 'none', border: 'none', color: '#8A9BB0', fontSize: '13px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'Inter, sans-serif' },
  btnContacto: { background: '#FF6B1A', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }
}