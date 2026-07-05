import { imageUrl } from '../../services/imageUrl'
import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Servicios({ preview }) {
  const [servicios, setServicios] = useState([])

  useEffect(() => {
    if (preview) return
    api.get('/servicios').then(res => setServicios(res.data)).catch(() => {})
  }, [preview])

  const fallback = [
    { id: 1, numero: '01', titulo: 'Reparación', descripcion: 'Recuperación de equipos de intercambio térmico, cambio de tubos, soldadura especializada, pruebas y más.', features: ['Diagnóstico técnico completo', 'Cambio de tubos y placas', 'Soldadura especializada', 'Pruebas de presión'] },
    { id: 2, numero: '02', titulo: 'Mantenimiento', descripcion: 'Mantenimiento preventivo y correctivo para maximizar la vida útil y eficiencia de sus equipos térmicos.', features: ['Inspección periódica', 'Limpieza y desincrostación', 'Reporte técnico detallado'] },
    { id: 3, numero: '03', titulo: 'Fabricación', descripcion: 'Fabricación de intercambiadores de calor y equipos a medida, según normas y requerimientos del cliente.', features: ['Diseño según TEMA / ASME', 'Materiales certificados', 'Control dimensional y de calidad', 'Entrega con documentación técnica'] },
  ]

  const source = preview || servicios
  const lista = source.length > 0 ? source : fallback

  return (
    <section id="servicios" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <div style={styles.tag}>Lo que hacemos</div>
            <h2 style={styles.title}>Nuestros <span style={{ color: '#FF6B1A' }}>Servicios</span></h2>
          </div>
          <button style={styles.btnVer}>Ver todos los servicios →</button>
        </div>
        <div style={styles.grid}>
          {lista.map((s, i) => (
            <div key={s.id} style={styles.card}>
              <div style={{ ...styles.cardImg, background: ['linear-gradient(135deg,#1A2940,#0A3020)', 'linear-gradient(135deg,#1A2030,#0A1520)', 'linear-gradient(135deg,#1A1A2E,#0A0A1A)'][i % 3] }}>
                {s.imagenId
                  ? <img src={imageUrl(s.imagenId)} alt={s.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  : <span style={{ fontSize: '48px' }}>{['🔧', '🔩', '🏭'][i % 3]}</span>
                }
                <div style={styles.cardNum}>{s.numero}</div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.cardTitle}>{s.titulo}</div>
                <div style={styles.cardDesc}>{s.descripcion}</div>
                <ul style={styles.features}>
                  {s.features.map((f, j) => (
                    <li key={j} style={styles.featureItem}>
                      <span style={styles.featureDot} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button style={styles.btnInfo}>Más información →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: { padding: '100px 2rem', background: '#0A1628' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' },
  tag: { fontSize: '12px', fontWeight: '600', color: '#29B6D8', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' },
  title: { fontFamily: 'sans-serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: '800', textTransform: 'uppercase', lineHeight: 1.1, color: '#fff', margin: 0 },
  btnVer: { background: 'transparent', border: '1px solid rgba(41,182,216,0.4)', color: '#29B6D8', padding: '10px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' },
  card: { background: '#0F1F3D', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' },
  cardImg: { height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cardNum: { position: 'absolute', top: '12px', right: '12px', fontFamily: 'sans-serif', fontSize: '48px', fontWeight: '800', color: 'rgba(41,182,216,0.18)', lineHeight: 1 },
  cardBody: { padding: '24px' },
  cardTitle: { fontFamily: 'sans-serif', fontSize: '24px', fontWeight: '700', color: '#fff', textTransform: 'uppercase', marginBottom: '10px' },
  cardDesc: { fontSize: '13px', color: '#8A9BB0', lineHeight: 1.7, marginBottom: '16px' },
  features: { listStyle: 'none', padding: 0, margin: 0 },
  featureItem: { fontSize: '12px', color: '#8A9BB0', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' },
  featureDot: { width: '4px', height: '4px', background: '#29B6D8', borderRadius: '50%', flexShrink: 0 },
  btnInfo: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(41,182,216,0.1)', border: '1px solid rgba(41,182,216,0.4)', color: '#29B6D8', padding: '10px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', marginTop: '1rem' }
}