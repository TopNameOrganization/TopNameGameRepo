import { Box, Button, Typography } from '@mui/material'
import { GeneralLayout } from '../layouts'
import videoBg from '../assets/landingVideo/videoBg.mp4'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export const RootPage = () => {
  return (
    <GeneralLayout>
      <div>
        <video
          src={videoBg}
          autoPlay
          muted
          loop
          preload="auto"
          style={{
            width: '100%',
            // height: '90vh',
            backgroundSize: 'contain',
            // position: 'absolute',
            // top: 0,
            // left: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '546px',
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
      </div>
    </GeneralLayout>
  )
}
