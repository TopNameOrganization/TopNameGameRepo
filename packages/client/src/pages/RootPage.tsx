import { Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROUTES } from '../constants'

export function RootPage() {
  const auth = useAuth()
  const content = auth.user ? (
    <button
      onClick={() => {
        auth.logout()
      }}>
      logout
    </button>
  ) : (
    <Link component={RouterLink} to={ROUTES.login} variant="body2">
      {'Sign In'}
    </Link>
  )

  return (
    <>
      <Typography component="h1" variant="h5">
        Profile page
      </Typography>
      {content}
    </>
  )
}
