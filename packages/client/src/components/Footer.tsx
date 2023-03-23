import * as React from 'react'
import { Box, Typography, Paper, Container, styled } from '@mui/material'

const MUIPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
}))

const MUITypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
}))

export const Footer = () => {
  return (
    <MUIPaper
      sx={{
        marginTop: 'calc(10% + 60px)',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
      square
      variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            display: 'flex',
            my: 1,
          }}>
          <MUITypography variant="caption" color="initial">
            Copyright ©2023.
          </MUITypography>
        </Box>
      </Container>
    </MUIPaper>
  )
}
