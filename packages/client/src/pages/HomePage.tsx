import { Box, Button, Stack, Typography } from '@mui/material'
import { AppLayout } from '../layouts/AppLayout'
import play from '../assets/appLayout/play.png'

export const HomePage = () => {
  return (
    <AppLayout>
      <Box
        sx={{
          position: 'absolute',
          top: '562px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateY(-50%)',
          left: 0,
          right:0
        }}>
        <Button
          disableRipple={true}
          sx={{
            backgroundImage: `url(${play})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '400px',
            width: '400px',
            transform: 'translateX(10%)',
            ":hover": {
              backgroundColor: 'transparent'
            },
          }}></Button>

        <Typography variant="h1">
          CLICK
          <br />
          FOR PLAY!
        </Typography>
      </Box>
    </AppLayout>
  )
}
