import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ROUTES } from './constants'
import { LoadingStub } from './components/LoadingStub'

export const ProtectedRoutes = () => {
  const auth = useAuth()
  const location = useLocation()

  if (auth.user.isLoading) {
    return <LoadingStub />
  }

  if (!auth.user.data) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  return <Outlet />
}
