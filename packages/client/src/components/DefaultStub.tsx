import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from '../constants'

interface Props {
  title?: string
  text?: string
  action?: React.ReactNode
}

export const DefaultStub = ({
  title = 'Error',
  text = 'Oops, something went wrong',
  action,
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Container maxWidth="md">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h6">{text}</Typography>
        {action || (
          <Button
            component={RouterLink}
            to={ROUTES.root}
            variant="contained"
            sx={{ mt: 1 }}>
            Back Home
          </Button>
        )}
      </Container>
    </Box>
  )
}
