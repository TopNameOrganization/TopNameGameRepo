import { Box, Button, Stack, Typography } from '@mui/material'
import { AppLayout } from '../layouts/AppLayout'
import play from '../assets/appLayout/play.png'

export const HomePage = () => {
  return (
    <AppLayout>
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          sx={{
            height: 0,
            width: '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
            transform: 'translateY(-61vh)',
          }}>
          <Button
            sx={{
              backgroundImage: `url(${play})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              height: '400px',
              width: '400px',
              transform: 'translateX(10%)'
            }}></Button>

          <Typography variant="h1">
            CLICK
            <br />
            FOR PLAY!
          </Typography>
        </Stack>
    </AppLayout>
  )
}
