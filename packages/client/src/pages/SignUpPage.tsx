import React from 'react'
import { Typography, Grid, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { SignUpForm } from '../components/signUp'
import { LoginLayout } from '../layouts/LoginLayout'
import { ROUTES } from '../constants'

export function SignUpPage() {
  return (
    <LoginLayout>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <SignUpForm />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to={ROUTES.login} variant="body2">
            {'Already have an account? Sign in'}
          </Link>
        </Grid>
      </Grid>
    </LoginLayout>
  )
}
