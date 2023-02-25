import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import FolderIcon from '@mui/icons-material/Folder'
import InfoIcon from '@mui/icons-material/Info'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
  Paper,
  Toolbar,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import brick from '../assets/appLayout/brick2.png'
import cassette from '../assets/appLayout/cassette.png'
import game_controller from '../assets/appLayout/game_controller.png'
import { useAuth } from '../context/AuthContext'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%'  }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Top name organization
            </Typography>
            {auth.user ? (
              <>
                <Box mr={3}>
                  <Button onClick={() => navigate('/profile')} color="inherit">
                    Profile
                  </Button>
                </Box>

                <Button
                  onClick={() => navigate('/logout')}
                  color="secondary"
                  variant="outlined">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Box mr={3}>
                  <Button onClick={() => navigate('/login')} color="inherit">
                    Sign In
                  </Button>
                </Box>

                <Button
                  onClick={() => navigate('/register')}
                  color="secondary"
                  variant="outlined">
                  Sign Up
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
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
              marginTop: '70px',
              opacity: 0.2,
              transform: 'rotate(-45deg)',
              zIndex: '0'
            }}>
              <img src={game_controller} style={{objectFit: 'cover'}}/>
            </Grid>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              marginTop: '20px',
              opacity: 0.2,
            }}>
              <img src={cassette} style={{objectFit: 'cover'}}/>
            </Grid>
        </Grid>
      </Box>

      <Box component="main" className="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box component="footer">
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <BottomNavigation>
          <BottomNavigationAction
            label="Info"
            value="info"
            icon={<InfoIcon />}
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
      </Box>
    </Box>
  )
}
