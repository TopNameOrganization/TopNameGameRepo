import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { SignUpForm } from '../components/signUp'

export default function SignUpPage() {
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <SignUpForm />
      </Box>
    </Container>
  )
}
