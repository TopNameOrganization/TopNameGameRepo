import React, { FC } from 'react'
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ClearIcon from '@mui/icons-material/Clear'
import { PauseScreenProps } from './types'

export const PauseScreen: FC<PauseScreenProps> = ({
  onReplay,
  onLevelUp,
  onOver,
  noRest,
}) => {
  return (
    <Box
      sx={{
        py: 5,
        px: 8,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -75%)',
        zIndex: 'modal',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component={Paper}>
      <Typography mb={4} component="h1" variant="h5">
        PAUSE
      </Typography>
      <Typography component="h3" variant="h6">
        Press ESC or P to resume game
      </Typography>
      <Typography component="h1" variant="h6">
        or select action
      </Typography>
      <List sx={{ mt: 2, width: 300 }}>
        <ListItem disablePadding>
          <ListItemButton disableRipple disabled={noRest} onClick={onReplay}>
            <ListItemIcon>
              <ReplayIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="replay level" secondary="rest -1" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disableRipple disabled={noRest} onClick={onLevelUp}>
            <ListItemIcon>
              <ArrowUpwardIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="level up" secondary="rest -1" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton disableRipple onClick={onOver}>
            <ListItemIcon>
              <ClearIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary="game over"
              secondary="immortalize to leaderboard"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
