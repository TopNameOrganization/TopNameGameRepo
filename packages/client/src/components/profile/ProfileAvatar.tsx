import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import ProfileAvatarDialog from './ProfileAvatarDialog';

export default function ProfileAvatar() {
    const [isShow, setIsShow] = React.useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsShow(true);
    }
    const handleMouseLeave = () => {
        setIsShow(false);
    }

    return (
        <Box
            sx={{position: 'relative', borderRadius: '50%', overflow: 'hidden'}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Avatar
                alt="Nick name"
                src="/public/images/avatar.jpg"
                sx={{width: 100, height: 100, m: 1}}
            />
            <ProfileAvatarDialog isShowDialogButton={isShow} />
        </Box>
    );
}
