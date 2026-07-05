
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.token)
      navigate('/admin')
    } catch (err) {
      setError('Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>HF</div>
          <span style={styles.logoText}>HEATFLUIX</span>
        </div>
        <h2 style={styles.title}>Panel de administración</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Correo</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@heatfluix.com"
              required
            />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Contraseña</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0A1628',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    background: '#0F1F3D',
    border: '1px solid rgba(41,182,216,0.2)',
    borderRadius: '12px',
    padding: '48px',
    width: '100%',
    maxWidth: '420px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '32px',
    justifyContent: 'center'
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg,#29B6D8,#FF6B1A)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '16px',
    color: '#fff',
    fontFamily: 'sans-serif'
  },
  logoText: {
    fontFamily: 'sans-serif',
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '1px'
  },
  title: {
    color: '#8A9BB0',
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '32px',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  group: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    color: '#29B6D8',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: '#0A1628',
    border: '1px solid rgba(41,182,216,0.2)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  error: {
    color: '#ff4d4d',
    fontSize: '13px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  btn: {
    width: '100%',
    padding: '14px',
    background: '#FF6B1A',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '8px'
  }
}