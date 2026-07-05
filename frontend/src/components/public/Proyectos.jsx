import { imageUrl } from '../../services/imageUrl'
import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Proyectos({ preview }) {
  const [proyectos, setProyectos] = useState([])

  useEffect(() => {
    if (preview) return
    api.get('/proyectos').then(res => setProyectos(res.data)).catch(() => {})
  }, [preview])

  const fallback = [
    { id: 1, emoji: '🔩', categoria: 'Fabricación', titulo: 'Intercambiador Shell & Tube', ubicacion: 'Refinería La Pampilla, Lima' },
    { id: 2, emoji: '⚙️', categoria: 'Reparación', titulo: 'Mantenimiento Planta Petroquímica', ubicacion: 'Talara, Piura' },
    { id: 3, emoji: '🏗️', categoria: 'Mantenimiento', titulo: 'Condensadores Industriales', ubicacion: 'Callao, Lima' },
    { id: 4, emoji: '🔥', categoria: 'Fabricación', titulo: 'Calderín Recuperador de Calor', ubicacion: 'Ilo, Moquegua' },
    { id: 5, emoji: '⚗️', categoria: 'Reparación', titulo: 'Reparación Enfriadores Gas', ubicacion: 'Camisea, Cusco' },
  ]

  const source = preview || proyectos
  const lista = source.length > 0 ? source : fallback

  return (
    <section id="proyectos" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <div style={styles.tag}>Nuestro portafolio</div>
            <h2 style={styles.title}>Proyectos <span style={{ color: '#FF6B1A' }}>Realizados</span></h2>
          </div>
          <button style={styles.btnPrimary}>Ver más proyectos →</button>
        </div>
        <div style={styles.grid}>
          {lista.map((p, i) => (
            <div key={p.id} style={{ ...styles.card, ...(i === 1 ? styles.cardTall : {}) }}>
              <div style={styles.cardBg}>
                {p.imagenId
                  ? <img src={imageUrl(p.imagenId)} alt={p.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: i === 1 ? '80px' : '60px' }}>{p.emoji}</span>
                }
              </div>
              <div style={styles.overlay}>
                <span style={styles.tag2}>{p.categoria}</span>
                <div style={styles.cardTitle}>{p.titulo}</div>
                <div style={styles.cardLoc}>📍 {p.ubicacion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: { padding: '100px 2rem', background: '#F5F8FF' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' },
  tag: { fontSize: '12px', fontWeight: '600', color: '#29B6D8', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' },
  title: { fontFamily: 'sans-serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: '800', textTransform: 'uppercase', lineHeight: 1.1, color: '#0A1628', margin: 0 },
  btnPrimary: { background: '#FF6B1A', color: '#fff', padding: '14px 28px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' },
  card: { borderRadius: '8px', overflow: 'hidden', background: '#0A1628', position: 'relative', height: '260px', cursor: 'pointer', border: '1px solid transparent' },
  cardTall: { gridRow: 'span 2', height: 'auto', minHeight: '400px' },
  cardBg: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0F1F3D,#0A2030)' },
  overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,22,40,0.95) 40%,transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' },
  tag2: { fontSize: '10px', fontWeight: '600', color: '#29B6D8', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px', background: 'rgba(41,182,216,0.15)', border: '1px solid rgba(41,182,216,0.35)', padding: '3px 10px', borderRadius: '100px', display: 'inline-block' },
  cardTitle: { fontFamily: 'sans-serif', fontSize: '20px', fontWeight: '700', color: '#fff', textTransform: 'uppercase' },
  cardLoc: { fontSize: '12px', color: '#8A9BB0', marginTop: '4px' }
}