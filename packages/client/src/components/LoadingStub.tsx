import React from 'react'
import { Box, Container, CircularProgress } from '@mui/material'

export const LoadingStub = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Container maxWidth="md">
        <CircularProgress />
      </Container>
    </Box>
  )
}
