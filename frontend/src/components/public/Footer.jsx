import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useConfig } from '../admin/ConfigContext'
import { imageUrl } from '../../services/imageUrl'

export default function Footer() {
  const [contacto, setContacto] = useState(null)
  const { config } = useConfig()

  useEffect(() => {
    api.get('/contacto').then(res => setContacto(res.data)).catch(() => {})
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const nombre = config?.nombreEmpresa || 'HEATFLUIX'
  const sublema = config?.sublema || 'INDUSTRIAL SOLUTIONS'
  const logo = config?.logoId ? imageUrl(config.logoId) : null
  const redes = [
    { label: 'in', url: config?.linkedin },
    { label: 'f', url: config?.facebook },
    { label: 'wa', url: config?.whatsapp },
  ].filter(r => r.url)

  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        <div>
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
          <p style={styles.brandP}>{config?.footerDesc || 'Especialistas en reparación, mantenimiento y fabricación de equipos de intercambio térmico para la industria.'}</p>
        </div>
        <div>
          <h4 style={styles.colTitle}>Servicios</h4>
          <ul style={styles.ul}>
            {['Reparación', 'Mantenimiento', 'Fabricación', 'Inspección END', 'Pruebas de presión'].map(s => (
              <li key={s} style={styles.li}><a href="#" style={styles.link}>{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={styles.colTitle}>Empresa</h4>
          <ul style={styles.ul}>
            {['Nosotros', 'Proyectos', 'Certificaciones', 'Blog técnico'].map(s => (
              <li key={s} style={styles.li}><button onClick={() => scrollTo(s.toLowerCase())} style={styles.linkBtn}>{s}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={styles.colTitle}>Contacto</h4>
          <ul style={styles.ul}>
            <li style={styles.li}><a href="#" style={styles.link}>{contacto?.telefono || '+51 923 619 993'}</a></li>
            <li style={styles.li}><a href="#" style={styles.link}>{contacto?.email || 'heatfluix@gmail.com'}</a></li>
            <li style={styles.li}><a href="#" style={styles.link}>{contacto?.direccion || 'Lima, Perú'}</a></li>
          </ul>
        </div>
      </div>
      <div style={styles.bottom}>
        <div style={styles.copy}>{config?.copyright || '© 2024 HeatFluix Industrial Solutions SAC. Todos los derechos reservados.'}</div>
        <div style={styles.socials}>
          {redes.map(r => (
            <a key={r.label} href={r.url} target="_blank" rel="noreferrer" style={styles.socialBtn}>{r.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: { background: '#060E1C', padding: '60px 2rem 30px', borderTop: '2px solid', borderImage: 'linear-gradient(90deg,#29B6D8,#FF6B1A) 1' },
  grid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logo: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' },
  logoIcon: { width: '40px', height: '40px', background: 'linear-gradient(135deg,#29B6D8,#FF6B1A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '16px', color: '#fff' },
  logoImg: { width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' },
  logoText: { fontFamily: 'sans-serif', fontSize: '22px', fontWeight: '700', color: '#fff', letterSpacing: '1px', display: 'block' },
  logoSub: { fontSize: '9px', color: '#29B6D8', letterSpacing: '3px', display: 'block', marginTop: '-4px' },
  brandP: { fontSize: '13px', color: '#8A9BB0', lineHeight: 1.7, maxWidth: '260px' },
  colTitle: { fontFamily: 'sans-serif', fontSize: '16px', fontWeight: '700', color: '#29B6D8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', marginTop: 0 },
  ul: { listStyle: 'none', padding: 0, margin: 0 },
  li: { marginBottom: '8px' },
  link: { fontSize: '13px', color: '#8A9BB0', textDecoration: 'none' },
  linkBtn: { fontSize: '13px', color: '#8A9BB0', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif' },
  bottom: { maxWidth: '1200px', margin: '0 auto', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  copy: { fontSize: '12px', color: '#8A9BB0' },
  socials: { display: 'flex', gap: '12px' },
  socialBtn: { width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(41,182,216,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#8A9BB0', textDecoration: 'none' }
}