import { imageUrl } from '../../services/imageUrl'
import { useEffect, useState } from 'react'
import api from '../../services/api'

const valoresFallback = [
  { id: 1, icono: '🏆', titulo: 'Calidad Garantizada', desc: 'Procesos certificados bajo normas internacionales' },
  { id: 2, icono: '👷', titulo: 'Equipo Profesional', desc: 'Ingenieros y técnicos especializados' },
  { id: 3, icono: '⏱️', titulo: 'Cumplimiento de Plazos', desc: 'Entregamos cada proyecto en tiempo y forma' },
  { id: 4, icono: '🛡️', titulo: 'Seguridad Primero', desc: 'Protocolos de seguridad en todas nuestras labores' },
]

export default function Nosotros({ preview, valoresPreview }) {
  const [fetched, setFetched] = useState(null)
  const [valores, setValores] = useState([])

  useEffect(() => {
    if (preview) return
    api.get('/nosotros').then(res => setFetched(res.data)).catch(() => {})
    api.get('/valores').then(res => setValores(res.data)).catch(() => {})
  }, [preview])

  const data = preview || fetched
  const source = valoresPreview || valores
  const listaValores = source.length > 0 ? source : valoresFallback

  return (
    <section id="nosotros" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.grid}>
         <div style={styles.imgWrapper}>
            <div style={styles.imgPlaceholder}>
              {data?.imagenId
                ? <img src={imageUrl(data.imagenId)} alt="Planta" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                : <span style={styles.imgLabel}>⚙️<br />Planta Metalmecánica<br /><small style={{ fontSize: '12px', fontWeight: 400, color: '#8A9BB0' }}>Lima, Perú</small></span>
              }
            </div>
            <div style={styles.badge}>
              <div style={styles.badgeNum}>{data?.aniosExp || 15}</div>
              <div style={styles.badgeTxt}>Años de<br />Experiencia</div>
            </div>
          </div>
          <div style={styles.textCol}>
            <div style={styles.tag}>Sobre nosotros</div>
            <h2 style={styles.title}>Empresa <span style={{ color: '#FF6B1A' }}>Metalmecánica</span> de Alta Precisión</h2>
            <p style={styles.p}>{data?.descripcion1 || 'Somos una empresa metalmecánica especializada en la reparación, mantenimiento técnico y fabricación de equipos de intercambio térmico. Contamos con un equipo técnico altamente capacitado y tecnología para brindar soluciones eficientes y confiables a la industria.'}</p>
            <p style={styles.p}>{data?.descripcion2 || 'Trabajamos bajo estrictos protocolos de calidad y seguridad, cumpliendo normas nacionales e internacionales en cada proyecto que emprendemos.'}</p>
            <div style={styles.valoresGrid}>
              {listaValores.map((v) => (
                <div key={v.id} style={styles.valorCard}>
                  <div style={styles.valorIcon}>{v.icono}</div>
                  <div>
                    <div style={styles.valorTitle}>{v.titulo}</div>
                    <div style={styles.valorDesc}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: { padding: '100px 2rem', background: '#F5F8FF' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' },
  imgWrapper: { position: 'relative' },
  imgPlaceholder: { width: '100%', height: '400px', background: 'linear-gradient(135deg,#0A1628,#0F2A3D)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  imgLabel: { color: '#29B6D8', fontFamily: 'sans-serif', fontSize: '20px', fontWeight: '700', textAlign: 'center', zIndex: 1, position: 'relative' },
  badge: { position: 'absolute', bottom: '-20px', right: '-20px', background: 'linear-gradient(135deg,#29B6D8,#FF6B1A)', color: '#fff', padding: '20px 24px', borderRadius: '8px', textAlign: 'center' },
  badgeNum: { fontFamily: 'sans-serif', fontSize: '48px', fontWeight: '800', lineHeight: 1 },
  badgeTxt: { fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9 },
  textCol: {},
  tag: { fontSize: '12px', fontWeight: '600', color: '#29B6D8', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' },
  title: { fontFamily: 'sans-serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: '800', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.5rem', color: '#0A1628' },
  p: { color: '#555', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '15px' },
  valoresGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' },
  valorCard: { background: '#fff', border: '1px solid #e8ecf2', borderLeft: '3px solid transparent', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '12px' },
  valorIcon: { width: '36px', height: '36px', background: 'rgba(41,182,216,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' },
  valorTitle: { fontWeight: '600', fontSize: '13px', color: '#0A1628', marginBottom: '4px' },
  valorDesc: { fontSize: '12px', color: '#8A9BB0', lineHeight: 1.5 }
}