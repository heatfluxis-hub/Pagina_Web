import { imageUrl } from '../../services/imageUrl'
import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Hero({ preview }) {
  const [fetched, setFetched] = useState(null)

  useEffect(() => {
    if (preview) return
    api.get('/hero').then(res => setFetched(res.data)).catch(() => {})
  }, [preview])

  const data = preview || fetched

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const stats = data ? [
    { num: data.stat1, suffix: '+', label: 'Proyectos realizados' },
    { num: data.stat2, suffix: '+', label: 'Años de experiencia' },
    { num: data.stat3, suffix: '%', label: 'Satisfacción de clientes' },
    { num: data.stat4, suffix: '+', label: 'Clientes en toda la región' },
  ] : []

  return (
    <section id="hero" style={{ ...styles.hero, ...(data?.imagenId ? { backgroundImage: `linear-gradient(135deg,rgba(10,22,40,0.92),rgba(15,31,61,0.85)), url(${imageUrl(data.imagenId)})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}) }}>
      <div style={styles.heroBg} />
      <div style={styles.gridLines} />
      {!data?.imagenId && <div style={styles.heatOrb} />}
      <div style={styles.content}>
        <div style={styles.badge}>
          <div style={styles.dot} />
          <span style={styles.badgeText}>
            {data?.badge || 'Especialistas en Intercambio Térmico'}
          </span>
        </div>
        <h1 style={styles.h1}>
          {data?.titulo
            ? (() => {
                const parts = data.titulo.split(',')
                if (parts.length >= 2) {
                  return <>{parts[0]},<span style={{ color: '#FF6B1A' }}>{parts[1]}</span>{parts.slice(2).map((p, i) => <span key={i}>,{p}</span>)}</>
                }
                return data.titulo
              })()
            : <>Soluciones Integrales en <span style={{ color: '#FF6B1A' }}>Reparación, Mantenimiento</span> y Fabricación</>
          }
        </h1>
        <p style={styles.p}>
          {data?.subtitulo || 'Brindamos servicios especializados con altos estándares de calidad, seguridad y eficiencia para la industria peruana e internacional.'}
        </p>
        <div style={styles.btns}>
          <button onClick={() => scrollTo('contacto')} style={styles.btnPrimary}>Cotizar ahora</button>
          <button onClick={() => scrollTo('servicios')} style={styles.btnSecondary}>Nuestros servicios ›</button>
        </div>
        {stats.length > 0 && (
          <div style={styles.statsRow}>
            {stats.map((s, i) => (
              <div key={i} style={styles.statItem}>
                <div style={styles.statNum}>{s.num}<span style={{ color: '#29B6D8' }}>{s.suffix}</span></div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const styles = {
  hero: { minHeight: '100vh', background: 'linear-gradient(135deg,#0A1628 0%,#0F1F3D 50%,#0A1628 100%)', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '68px' },
  heroBg: { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(41,182,216,0.07) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,107,26,0.06) 0%, transparent 50%)' },
  gridLines: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(41,182,216,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(41,182,216,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' },
  heatOrb: { position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: '420px', height: '420px', background: 'radial-gradient(circle,rgba(41,182,216,0.12) 0%,rgba(255,107,26,0.08) 40%,transparent 70%)', borderRadius: '50%' },
  content: { maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(41,182,216,0.12)', border: '1px solid rgba(41,182,216,0.35)', padding: '6px 16px', borderRadius: '100px', marginBottom: '1.5rem' },
  dot: { width: '6px', height: '6px', background: '#29B6D8', borderRadius: '50%' },
  badgeText: { fontSize: '12px', color: '#29B6D8', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' },
  h1: { fontFamily: 'sans-serif', fontSize: 'clamp(42px,6vw,80px)', fontWeight: '800', color: '#fff', lineHeight: 1.05, textTransform: 'uppercase', maxWidth: '680px', marginBottom: '1.5rem' },
  p: { fontSize: '16px', color: '#8A9BB0', maxWidth: '500px', lineHeight: 1.7, marginBottom: '2.5rem' },
  btns: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  btnPrimary: { background: '#FF6B1A', color: '#fff', padding: '16px 36px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' },
  btnSecondary: { background: 'transparent', color: '#29B6D8', padding: '16px 36px', border: '2px solid rgba(41,182,216,0.4)', borderRadius: '4px', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' },
  statsRow: { display: 'flex', gap: '3rem', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(41,182,216,0.15)' },
  statItem: {},
  statNum: { fontFamily: 'sans-serif', fontSize: '44px', fontWeight: '800', color: '#fff', lineHeight: 1 },
  statLabel: { fontSize: '12px', color: '#8A9BB0', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }
}