import { useConfig } from '../../components/admin/ConfigContext'
import { imageUrl } from '../../services/imageUrl'
import ConfiguracionEditor from './ConfiguracionEditor'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import HeroEditor from './HeroEditor'
import NosotrosEditor from './NosotrosEditor'
import ServiciosEditor from './ServiciosEditor'
import ProyectosEditor from './ProyectosEditor'
import ContactoEditor from './ContactoEditor'
import PorqueEditor from './PorqueEditor'
import ContadorEditor from './ContadorEditor'
import WhatsappEditor from './WhatsappEditor'
const menu = [
  { key: 'configuracion', label: '⚙️ Configuración' },
  { key: 'hero', label: '🏠 Hero' },
  { key: 'contador', label: '🔢 Contador' },
  { key: 'nosotros', label: '🏢 Nosotros' },
  { key: 'servicios', label: '🔧 Servicios' },
  { key: 'proyectos', label: '🏗️ Proyectos' },
  { key: 'porque', label: '⭐ Por qué elegirnos' },
  { key: 'contacto', label: '📞 Contacto' },
  { key: 'whatsapp', label: '💬 WhatsApp' },
]

export default function Dashboard() {
  const { logout } = useAuth()
  const { config } = useConfig()
  const navigate = useNavigate()
  const [seccion, setSeccion] = useState('configuracion')
  

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const renderEditor = () => {
  switch (seccion) {
    case 'configuracion': return <ConfiguracionEditor />
    case 'hero': return <HeroEditor />
    case 'nosotros': return <NosotrosEditor />
    case 'servicios': return <ServiciosEditor />
    case 'proyectos': return <ProyectosEditor />
    case 'contacto': return <ContactoEditor />
    case 'porque': return <PorqueEditor />
    case 'contador': return <ContadorEditor />
    case 'whatsapp': return <WhatsappEditor />
    default: return null
  }
}

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          {config?.logoId
            ? <img src={imageUrl(config.logoId)} alt="logo" style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
            : <div style={styles.logoIcon}>HF</div>
          }
          <span style={styles.logoText}>{config?.nombreEmpresa || 'ADMIN'}</span>
        </div>
        <nav>
          {menu.map(item => (
            <button
              key={item.key}
              onClick={() => setSeccion(item.key)}
              style={{
                ...styles.menuItem,
                ...(seccion === item.key ? styles.menuItemActive : {})
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🚪 Cerrar sesión
        </button>
      </aside>

      {/* Contenido */}
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            {menu.find(m => m.key === seccion)?.label}
          </h1>
          <span style={styles.headerSub}>Panel de administración — HeatFluix</span>
        </div>
        <div style={styles.content}>
          {renderEditor()}
        </div>
      </main>
    </div>
  )
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: '#0A1628',
    fontFamily: 'Inter, sans-serif'
  },
  sidebar: {
    width: '240px',
    background: '#060E1C',
    borderRight: '1px solid rgba(41,182,216,0.15)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh'
  },
  sidebarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 24px 32px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    marginBottom: '16px'
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    background: 'linear-gradient(135deg,#29B6D8,#FF6B1A)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '14px',
    color: '#fff'
  },
  logoText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: '16px',
    letterSpacing: '2px'
  },
  menuItem: {
    width: '100%',
    padding: '12px 24px',
    background: 'transparent',
    border: 'none',
    color: '#8A9BB0',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent'
  },
  menuItemActive: {
    color: '#29B6D8',
    background: 'rgba(41,182,216,0.08)',
    borderLeft: '3px solid #29B6D8'
  },
  logoutBtn: {
    marginTop: 'auto',
    marginLeft: '24px',
    marginRight: '24px',
    padding: '10px 16px',
    background: 'rgba(255,107,26,0.1)',
    border: '1px solid rgba(255,107,26,0.3)',
    borderRadius: '4px',
    color: '#FF6B1A',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left'
  },
  main: {
    marginLeft: '240px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '24px 40px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: '#060E1C'
  },
  headerTitle: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '700',
    margin: 0
  },
  headerSub: {
    color: '#8A9BB0',
    fontSize: '12px',
    letterSpacing: '1px'
  },
  content: {
    padding: '40px',
    flex: 1
  }
}