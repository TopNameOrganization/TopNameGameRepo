import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ROUTES } from './constants'

export const PublicRoutes = () => {
  const auth = useAuth()

  if (auth.user) {
    return <Navigate to={ROUTES.root} replace />
  }

  return <Outlet />
}
