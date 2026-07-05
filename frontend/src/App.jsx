import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ConfigProvider } from './components/admin/ConfigContext'

import Home from './pages/Home'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth()
  return isAuth ? children : <Navigate to="/admin/login" />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ConfigProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ConfigProvider>
    </AuthProvider>
  )
}