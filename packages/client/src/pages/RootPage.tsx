import { Box, Button, Typography } from '@mui/material'
import { GeneralLayout } from '../layouts'
import videoBg from '../assets/landingVideo/videoBg.mp4'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export const RootPage = () => {
  const navigate = useNavigate()
  return (
    <GeneralLayout>
      <>
        <video
          src={videoBg}
          autoPlay
          muted
          loop
          preload="auto"
          style={{
            width: '100%',
            height: 'calc(100% - 87.51px)',
            objectFit: 'contain',
            backgroundColor: 'black'
          }}
        />
        <Box onClick={() => navigate(ROUTES.game)}
          sx={{
            position: 'absolute',
            top: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'translateY(-50%)',
            left: 0,
            right: 0,
          }}>
          <Button
            disableRipple={true}
            sx={{
              transform: 'translateX(10%)',
              ':hover': {
                backgroundColor: 'transparent',
              },
            }}>
            <PlayArrowIcon 
              sx={{
                color: 'white',
                height: '400px',
                width: '400px',
              }}
            />
          </Button>
          <Button 
            disableRipple={true}
            sx={{
              color: 'white',
              ':hover': {
                backgroundColor: 'transparent',
              },
            }}>
            <Typography variant="h1">
              CLICK
              <br />
              FOR PLAY!
            </Typography>
          </Button>
        </Box>
      </>
    </GeneralLayout>
  )
}
