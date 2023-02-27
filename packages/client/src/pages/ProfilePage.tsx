import * as React from 'react'
import { Container } from '@mui/material'
import { Profile } from '../components/profile/Profile'
import { GeneralLayout } from '../layouts'

export const ProfilePage = () => {
  return (
    <GeneralLayout>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Profile />
      </Container>
    </GeneralLayout>
  )
}
