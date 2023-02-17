import * as React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Profile } from '../components/profile/Profile'

export const ProfilePage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Profile page
      </Typography>
      <Profile />
    </Container>
  )
}
