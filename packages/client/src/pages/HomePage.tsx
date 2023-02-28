import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import play from '../assets/appLayout/play.png'
import { GeneralLayout } from '../layouts'
import brick from '../assets/appLayout/brick2.png'
import cassette from '../assets/appLayout/cassette.png'
import game_controller from '../assets/appLayout/game_controller.png'

export const HomePage = () => {
  return (
    <GeneralLayout>
      <Paper
          elevation={24}
          sx={{
            backgroundImage: `url(${brick})`,
            backgroundSize: 'cover',
            backgroungPosition: 'center',
            height: '500px',
            width: '100%'
          }}>
          <Container fixed>
            <Grid container>
              <Grid item md={6}>
                <div>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                    sx={{ marginTop: '30px', color: '#fff' }}>
                    Top name game
                  </Typography>
                  <Typography
                    component="h5"
                    color="#fff"
                    paragraph
                    maxWidth="70%">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Similique perferendis repudiandae nemo quod eum esse minus
                    qui quaerat? Repudiandae inventore voluptatem amet ex hic
                    harum accusamus sapiente quia fugit sed.
                  </Typography>
                  <Button variant="contained" color="secondary">
                    forum
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        <Grid container>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              opacity: 0.2,
              zIndex: '0'
            }}>
              <img src={game_controller} style={{objectFit: 'cover', width: '100%'}}/>
            </Grid>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              marginTop: '20px',
              opacity: 0.2,
            }}>
              <img src={cassette} style={{objectFit: 'cover', width: '100%'}}/>
            </Grid>
        </Grid>
      <Box
        sx={{
          position: 'absolute',
          top: '546px',
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
    </GeneralLayout>
  )
}
