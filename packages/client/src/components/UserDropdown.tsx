import * as React from 'react'
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material'
import { Person, Logout } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { ROUTES, resourcesUrl } from '../constants'
import { useAppSelector } from '../hooks/redux'
import { useAuth } from '../context/AuthContext'
import { useCustomTheme } from '../context/ThemeProvider'

export const UserDropdown = () => {
  const auth = useAuth()
  const { theme } = useCustomTheme()
  const { avatar, display_name } = useAppSelector(
    state => state.userReducer.user
  )
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={display_name || 'Nick name'}
            src={resourcesUrl + avatar || ''}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        PaperProps={{
          sx: {
            width: '180px',
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <Typography
            textAlign="center"
            to={ROUTES.profile}
            component={Link}
            sx={{
              textDecoration: 'none',
              color: theme === 'light' ? '#000' : '#fff',
            }}>
            Profile
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => auth.logout.action()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
