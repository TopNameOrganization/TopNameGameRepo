import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { SignInForm } from '../components/signIn'

export default function SignInPage() {
  return (
    <Container component="main" maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
        }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm />
      </Box>
    </Container>
  )
}
