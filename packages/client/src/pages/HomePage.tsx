import { Box, Button, Stack, Typography } from '@mui/material'
import { AppLayout } from '../layouts/AppLayout'
import play from '../assets/appLayout/play.png'

export const HomePage = () => {
  return (
    <AppLayout>
      <Box component="main">
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          sx={{
            height: '400px',
            width: '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
            transform: 'translateY(-50%)',
          }}>
          <Button
            sx={{
              backgroundImage: `url(${play})`,
              backgroundSize: 'contain',
              height: '400px',
              width: '400px',
              padding: 0,
              transform: 'translateX(10%)',
            }}></Button>

          <Typography variant="h1">
            CLICK
            <br />
            FOR PLAY!
          </Typography>
        </Stack>
      </Box>
    </AppLayout>
  )
}
