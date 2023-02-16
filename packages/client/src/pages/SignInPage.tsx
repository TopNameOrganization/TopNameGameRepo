import React from 'react'
import { Typography, Grid, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { SignInForm } from '../components/signIn'
import { LoginLayout } from '../layouts/LoginLayout'
import { ROUTES } from '../constants'

export function SignInPage() {
  return (
    <LoginLayout>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <SignInForm />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to={ROUTES.signup} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </LoginLayout>
  )
}
