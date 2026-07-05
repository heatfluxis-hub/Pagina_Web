import { useEffect, useState } from 'react'
import api from '../../services/api'

// Devuelve la inicial del nombre
const inicial = (nombre) => (nombre ? nombre.trim().charAt(0).toUpperCase() : '?')

const WaIcon = ({ size = 32, fill = '#fff' }) => (
  <svg viewBox="0 0 32 32" fill={fill} style={{ width: size, height: size }}>
    <path d="M16 0C7.2 0 0 7.2 0 16c0 2.8.7 5.5 2.1 7.9L0 32l8.3-2.2c2.3 1.3 4.9 1.9 7.7 1.9 8.8 0 16-7.2 16-16S24.8 0 16 0zm0 29.3c-2.5 0-4.9-.7-7-1.9l-.5-.3-5.2 1.4 1.4-5.1-.3-.5c-1.4-2.2-2.1-4.7-2.1-7.3C2.2 8.6 8.4 2.4 16 2.4S29.8 8.6 29.8 16 23.6 29.3 16 29.3z"/>
    <path d="M24.3 19.6c-.5-.2-2.7-1.3-3.1-1.5-.4-.2-.7-.2-1 .2-.3.5-1.1 1.5-1.4 1.7-.3.2-.5.3-1 .1-.5-.2-1.9-.7-3.7-2.3-1.4-1.2-2.3-2.7-2.6-3.2-.3-.5 0-.7.2-1 .2-.2.5-.5.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-1-2.5-1.4-3.4-.4-.9-.8-.7-1-.8h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.5-1.6 3.7s1.6 4.3 1.9 4.6c.2.3 3.2 4.9 7.7 6.8 1.1.5 1.9.7 2.6.9 1.1.3 2 .3 2.8.2.9-.1 2.7-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.9-.5z"/>
  </svg>
)

export default function WhatsappWidget({ preview, contactosPreview }) {
  const [config, setConfig] = useState(null)
  const [contactos, setContactos] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (preview) return
    api.get('/whatsapp/config').then(res => setConfig(res.data)).catch(() => {})
    api.get('/whatsapp/contactos').then(res => setContactos(res.data)).catch(() => {})
  }, [preview])

  const cfg = preview || config
  const listaContactos = contactosPreview || contactos

  // Si está en modo preview, forzamos el panel abierto para verlo
  const isOpen = preview ? true : open

  // No mostrar si está desactivado o no hay contactos
  if (!preview && (!cfg || cfg.activo === false)) return null
  if (listaContactos.length === 0 && !preview) return null

  const abrirChat = (numero) => {
    const limpio = (numero || '').replace(/\D/g, '')
    window.open(`https://wa.me/${limpio}`, '_blank')
  }

  return (
    <div style={{ ...styles.widget, ...(preview ? styles.widgetPreview : {}) }}>
      {/* Panel */}
      <div style={{ ...styles.panel, ...(isOpen ? styles.panelOpen : {}) }}>
        <div style={styles.header}>
          <div style={styles.headerAvatar}><WaIcon size={30} fill="#25D366" /></div>
          <div style={styles.headerInfo}>
            <h3 style={styles.headerTitle}>{cfg?.titulo || 'HeatFluix'}</h3>
            <div style={styles.headerStatus}>
              <span style={styles.statusDot} />
              {cfg?.estado || 'En línea · responde en minutos'}
            </div>
          </div>
          {!preview && (
            <button style={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
          )}
        </div>

        <div style={styles.welcome}>
          <p style={styles.welcomeText}>{cfg?.bienvenida || '¡Hola! 👋 Elige con quién deseas conversar.'}</p>
        </div>

        <div style={styles.contacts}>
          {listaContactos.map((c) => (
            <div key={c.id} style={styles.contact} onClick={() => !preview && abrirChat(c.numero)}>
              <div style={{ ...styles.contactAvatar, background: c.color || '#FF6B1A' }}>
                {inicial(c.nombre)}
              </div>
              <div style={styles.contactInfo}>
                <div style={styles.contactName}>{c.nombre || 'Nombre'}</div>
                <div style={styles.contactRole}>{c.cargo || 'Cargo'}</div>
              </div>
              <div style={styles.contactWa}><WaIcon size={20} fill="#25D366" /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón flotante */}
      <button style={{ ...styles.fab, ...(isOpen ? styles.fabActive : {}) }} onClick={() => !preview && setOpen(!open)}>
        {!isOpen && <span style={styles.pulse} />}
        {!isOpen && listaContactos.length > 0 && (
          <span style={styles.badge}>{listaContactos.length}</span>
        )}
        {isOpen ? <span style={styles.closeIcon}>✕</span> : <WaIcon size={34} fill="#fff" />}
      </button>
    </div>
  )
}

const styles = {
  widget: { position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' },
  widgetPreview: { position: 'relative', bottom: 'auto', right: 'auto', alignItems: 'center' },
  panel: { width: '340px', background: '#0F1F3D', border: '1px solid rgba(41,182,216,0.2)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', transformOrigin: 'bottom right', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', opacity: 0, transform: 'scale(0.85) translateY(20px)', pointerEvents: 'none' },
  panelOpen: { opacity: 1, transform: 'scale(1) translateY(0)', pointerEvents: 'all' },
  header: { background: 'linear-gradient(135deg,#25D366,#128C7E)', padding: '20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' },
  headerAvatar: { width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  headerInfo: { flex: 1 },
  headerTitle: { color: '#fff', fontSize: '17px', fontWeight: '700', margin: 0, marginBottom: '2px' },
  headerStatus: { color: 'rgba(255,255,255,0.9)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' },
  statusDot: { width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 0 2px rgba(255,255,255,0.3)' },
  closeBtn: { position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', width: '28px', height: '28px', borderRadius: '50%', color: '#fff', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  welcome: { padding: '20px', background: '#0A1628', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  welcomeText: { color: '#c5d0dd', fontSize: '14px', lineHeight: 1.6, margin: 0 },
  contacts: { padding: '12px', maxHeight: '320px', overflowY: 'auto' },
  contact: { display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', cursor: 'pointer', transition: 'background 0.2s', marginBottom: '6px' },
  contactAvatar: { width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: '#fff', flexShrink: 0 },
  contactInfo: { flex: 1, minWidth: 0 },
  contactName: { color: '#fff', fontSize: '15px', fontWeight: '600', marginBottom: '2px' },
  contactRole: { color: '#8A9BB0', fontSize: '12px' },
  contactWa: { width: '36px', height: '36px', background: 'rgba(37,211,102,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  fab: { width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg,#25D366,#128C7E)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(37,211,102,0.4)', transition: 'all 0.3s', position: 'relative' },
  fabActive: { background: 'linear-gradient(135deg,#5a6b7d,#3d4a5a)' },
  closeIcon: { fontSize: '26px', color: '#fff' },
  badge: { position: 'absolute', top: '-4px', right: '-4px', width: '22px', height: '22px', background: '#ff4d4d', borderRadius: '50%', color: '#fff', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0A1628' },
  pulse: { position: 'absolute', inset: 0, borderRadius: '50%', background: '#25D366', animation: 'waPulse 2s ease-out infinite', zIndex: -1 }
}