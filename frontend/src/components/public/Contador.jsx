import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
    if (!target) { setCount(0); return }
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return count
}

const StatItem = ({ numero, suffix, label }) => {
  const count = useCountUp(numero)
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={styles.num}>{count}<span>{suffix}</span></div>
      <div style={styles.label}>{label}</div>
    </div>
  )
}

export default function Contador({ preview }) {
  const [contadores, setContadores] = useState([])

  useEffect(() => {
    if (preview) return
    api.get('/contador').then(res => setContadores(res.data)).catch(() => {})
  }, [preview])

  const lista = preview || contadores

  if (lista.length === 0) return null

  return (
    <div style={styles.section}>
      <div style={{ ...styles.grid, gridTemplateColumns: `repeat(${lista.length}, 1fr)` }}>
        {lista.map((item) => <StatItem key={item.id} {...item} />)}
      </div>
    </div>
  )
}

const styles = {
  section: { background: 'linear-gradient(135deg,#29B6D8 0%,#1A9BBF 40%,#FF6B1A 100%)', padding: '60px 2rem' },
  grid: { display: 'grid', gap: '2rem', maxWidth: '1200px', margin: '0 auto' },
  num: { fontFamily: 'sans-serif', fontSize: '56px', fontWeight: '800', color: '#fff', lineHeight: 1 },
  label: { fontSize: '13px', color: 'rgba(255,255,255,0.85)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '6px' }
}