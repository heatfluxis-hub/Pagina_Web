import { useEffect, useState } from 'react'
import api from '../../services/api'

const fallback = [
  { id: 1, icono: '👷', titulo: 'Equipo Especializado', desc: 'Profesionales con formación técnica e ingeniería metalmecánica y amplia experiencia en campo.' },
  { id: 2, icono: '🔬', titulo: 'Tecnología Avanzada', desc: 'Equipos y herramientas de última generación para diagnóstico, fabricación y pruebas no destructivas.' },
  { id: 3, icono: '✅', titulo: 'Calidad Certificada', desc: 'Trabajamos bajo normas nacionales e internacionales ASME, TEMA y AWS en cada proyecto.' },
  { id: 4, icono: '🛡️', titulo: 'Seguridad Absoluta', desc: 'Estrictos protocolos de seguridad industrial en cada etapa de nuestros servicios y proyectos.' },
]

export default function Porque({ preview }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (preview) return
    api.get('/porque').then(res => setItems(res.data)).catch(() => {})
  }, [preview])

  const source = preview || items
  const lista = source.length > 0 ? source : fallback

  return (
    <section id="porque" style={styles.section}>
      <div style={styles.container}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={styles.tag}>Nuestra ventaja</div>
          <h2 style={styles.title}>¿Por qué <span style={{ color: '#FF6B1A' }}>Elegirnos</span>?</h2>
        </div>
        <div style={styles.grid}>
          {lista.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.icon}>{item.icono}</div>
              <div style={styles.cardTitle}>{item.titulo}</div>
              <div style={styles.cardDesc}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: { background: '#0A1628', padding: '100px 2rem' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  tag: { fontSize: '12px', fontWeight: '600', color: '#29B6D8', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' },
  title: { fontFamily: 'sans-serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: '800', textTransform: 'uppercase', lineHeight: 1.1, color: '#fff', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' },
  card: { background: '#0F1F3D', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '32px 24px', textAlign: 'center' },
  icon: { width: '60px', height: '60px', background: 'rgba(41,182,216,0.1)', border: '1px solid rgba(41,182,216,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 1.5rem' },
  cardTitle: { fontFamily: 'sans-serif', fontSize: '18px', fontWeight: '700', color: '#fff', textTransform: 'uppercase', marginBottom: '10px' },
  cardDesc: { fontSize: '13px', color: '#8A9BB0', lineHeight: 1.7 }
}