import * as React from 'react';
import Box from '@mui/material/Box';
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";

export default function Profile() {
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <ProfileAvatar />
            <ProfileForm />
        </Box>
    );
}
