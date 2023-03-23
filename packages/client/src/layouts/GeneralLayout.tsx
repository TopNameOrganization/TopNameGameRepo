import * as React from 'react'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'
import { UserDropdown } from '../components/UserDropdown'
import { HeaderLinks } from '../components/HeaderLinks'
import { useAuth } from '../context/AuthContext'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { Footer } from '../components/Footer'

export const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth()
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }} component="main">
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            to={ROUTES.root}
            sx={{ textDecoration: 'none' }}>
            Lode runner
          </Typography>
          {auth.user.data ? (
            <>
              <HeaderLinks />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeSwitcher />
                <UserDropdown />
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeSwitcher />
              <Button
                size="small"
                component={Link}
                to={ROUTES.login}
                variant="contained"
                sx={{ fontWeight: 'bold' }}>
                Login
              </Button>
              <Button
                size="small"
                component={Link}
                to={ROUTES.signup}
                variant="contained"
                sx={{ ml: 1, fontWeight: 'bold' }}>
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {children}
      <Footer />
    </Box>
  )
}
