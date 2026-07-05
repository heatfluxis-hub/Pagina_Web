import { createContext, useContext, useEffect, useState } from 'react'
import api from '../../services/api'

const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null)

  const loadConfig = () => {
    api.get('/configuracion').then(res => setConfig(res.data)).catch(() => {})
  }

  useEffect(() => { loadConfig() }, [])

  return (
    
    <ConfigContext.Provider value={{ config, reloadConfig: loadConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)