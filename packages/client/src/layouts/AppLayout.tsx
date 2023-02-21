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
  Grid,
  Paper,
  Toolbar,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import brick from '../assets/appLayout/brick2.png'
import cassette from '../assets/appLayout/cassette.png'
import game_controller from '../assets/appLayout/game_controller.jpg'
import { useAuth } from '../context/AuthContext'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
            width: '100%',
          }}></Paper>
        <Grid container>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              backgroundImage: `url(${game_controller})`,
              height: 'auto',
              width: 'auto',
            }}></Grid>
          <Grid
            item
            xs={6}
            md={6}
            sx={{
              backgroundImage: `url(${cassette})`,
              height: '100%',
              width: '100%',
            }}></Grid>
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
