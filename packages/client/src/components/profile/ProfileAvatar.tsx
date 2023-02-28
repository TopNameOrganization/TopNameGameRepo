import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import ProfileAvatarDialog from './ProfileAvatarDialog';
import {useAppSelector} from "../../hooks/redux";

const resourcesUrl = 'https://ya-praktikum.tech/api/v2/resources'

export default function ProfileAvatar() {
    const [isShow, setIsShow] = React.useState<boolean>(false);
    const { avatar, display_name } = useAppSelector((state) => state.userReducer.user);


  const handleMouseEnter = () => {
    setIsShow(true)
  }
  const handleMouseLeave = () => {
    setIsShow(false)
  }

  return (
    <Box
      sx={{ position: 'relative', borderRadius: '50%', overflow: 'hidden' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Avatar
        alt={display_name || 'Nick name'}
        src={resourcesUrl + avatar || ''}
        sx={{ width: 100, height: 100, m: 1 }}
      />
      <ProfileAvatarDialog isShowDialogButton={isShow} />
    </Box>
  )
}
