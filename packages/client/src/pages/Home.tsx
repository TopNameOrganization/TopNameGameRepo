import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import FolderIcon from '@mui/icons-material/Folder'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {
  Container,
  createTheme,
  Grid,
  Paper,
  Stack,
  ThemeProvider,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'
import brick from '../assets/landing/brick.jpg'
import play from '../assets/landing/play.png'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const barTheme = createTheme({
    palette: { primary: { main: '#0b1928' } },
  })
  const navigate = useNavigate()

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={barTheme}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Top name organization
              </Typography>
              <Box mr={3}>
                <Button onClick={() => navigate('/login')} color="inherit">
                  Sign In
                </Button>
              </Box>

              <Button onClick={() => navigate('/register')} color="secondary" variant="outlined">
                Sign Up
              </Button>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <main>
        <Paper
          sx={{
            backgroundImage: `url(${brick})`,
            backgroundSize: 'cover',
            backgroungPosition: 'center',
            height: '400px',
            width: '100%',
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
                    color="inherit"
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
      </main>
      <footer>
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <BottomNavigation>
          <BottomNavigationAction
            label="Interests"
            value="interests"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="Favourites"
            value="favourites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<FolderIcon />}
          />
        </BottomNavigation>
        <Typography
          align="center"
          color="textSecondary"
          component="p"
          variant="subtitle1">
          Yandex Praktikum ReactApp
        </Typography>
      </footer>
    </>
  )
}

export default Home
