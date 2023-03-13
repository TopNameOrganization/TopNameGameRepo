import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { ROUTES } from './constants'
import { LoadingStub } from './components/LoadingStub'
import React from 'react'

export const PublicRoutes = () => {
  const auth = useAuth()

  if (auth.user.isLoading) {
    return <LoadingStub />
  }

  if (auth.user.data) {
    return <Navigate to={ROUTES.root.path} replace />
  }

  return <Outlet />
}
