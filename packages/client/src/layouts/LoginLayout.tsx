import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        {children}
      </Box>
    </Container>
  )
}
