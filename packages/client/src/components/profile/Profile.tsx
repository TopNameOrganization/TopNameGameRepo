import * as React from 'react';
import Box from '@mui/material/Box';
import ProfileAvatar from "./ProfileAvatar";
import {ProfileForm} from "./ProfileForm";
import {PasswordForm} from "./PasswordFrom";
import Button from "@mui/material/Button";

export const Profile = () => {
    const [showForm, setShowForm] = React.useState<boolean>(false);
    const [showProfileForm, setShowProfileForm] = React.useState<boolean>(true);
    const [showPasswordForm, setShowPasswordForm] = React.useState<boolean>(false);

    const useForm = () => {
        setShowForm(false);
        setShowProfileForm(true);
        setShowPasswordForm(false);
    };

    const useProfileForm = () => {
        setShowForm(true);
        setShowProfileForm(true);
        setShowPasswordForm(false);
    };

    const usePasswordForm = () => {
        setShowForm(true);
        setShowProfileForm(false);
        setShowPasswordForm(true);
    };

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
            {
                showProfileForm &&
                <ProfileForm noUseForm={useForm} isDisabled={showForm}/>
            }
            {
                showForm &&
                showPasswordForm &&
                <PasswordForm noUseForm={useForm} />
            }
            {
                !showForm &&
                <Button
                    onClick={useProfileForm}
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{mt: 5, mb: 2}}
                >
                    Edit Profile
                </Button>
            }
            {
                !showForm &&
                <Button
                    onClick={usePasswordForm}
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{mt: 1, mb: 2}}
                >
                    Change Password
                </Button>
            }
        </Box>
    );
}
