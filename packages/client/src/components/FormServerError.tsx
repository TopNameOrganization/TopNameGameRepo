import React from 'react'
import { Typography } from '@mui/material'

interface Props {
  message: string
}

export function FormServerError({ message }: Props) {
  return (
    <Typography
      variant="body2"
      sx={{
        color: '#d32f2f',
        w: '100%',
        m: 0,
        textAlign: 'center',
        display: 'block',
      }}>
      {message}
    </Typography>
  )
}
