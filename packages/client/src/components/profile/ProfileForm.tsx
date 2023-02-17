import * as React from 'react';
import {useFormik} from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {validationUserProfile} from "./validation";
import {useEffect} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {UserProfileData} from "../../api/types";

export const ProfileForm = (props: any) => {
    const { user } = useTypedSelector((state) => state.user);
    const { fetchUser, changeUserProfile } = useActions()

    useEffect(() => {
        fetchUser()
    }, [])

    const formik = useFormik({
        initialValues: {
            first_name: user.first_name || '',
            second_name: user.second_name || '',
            display_name: user.display_name || '',
            login: user.login || '',
            phone: user.phone || '',
            email: user.email || ''
        },
        enableReinitialize: true,
        validationSchema: validationUserProfile,
        onSubmit: (profileData: UserProfileData) => {
            changeUserProfile(profileData)
            props.noUseForm()
        },
    });

    return (
        <Box id="profileForm" component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                variant="standard"
                margin="dense"
                fullWidth
                name="first_name"
                label="First name"
                type="text"
                id="first_name"
                autoComplete="first_name"
                disabled={!props.isDisabled}
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
            />
            <TextField
                variant="standard"
                margin="dense"
                fullWidth
                name="second_name"
                label="Second name"
                type="text"
                id="second_name"
                autoComplete="second_name"
                disabled={!props.isDisabled}
                value={formik.values.second_name}
                onChange={formik.handleChange}
                error={formik.touched.second_name && Boolean(formik.errors.second_name)}
                helperText={formik.touched.second_name && formik.errors.second_name}
            />
            <TextField
                variant="standard"
                margin="dense"
                required
                fullWidth
                name="display_name"
                label="Nick name"
                type="text"
                id="display_name"
                autoComplete="display_name"
                disabled={!props.isDisabled}
                value={formik.values.display_name}
                onChange={formik.handleChange}
                error={formik.touched.display_name && Boolean(formik.errors.display_name)}
                helperText={formik.touched.display_name && formik.errors.display_name}
            />
            <TextField
                variant="standard"
                margin="dense"
                required
                fullWidth
                name="login"
                label="login"
                type="text"
                id="login"
                autoComplete="login"
                disabled={!props.isDisabled}
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
                variant="standard"
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={!props.isDisabled}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                variant="standard"
                margin="dense"
                fullWidth
                name="phone"
                label="Phone"
                type="tel"
                id="phone"
                autoComplete="phone"
                disabled={!props.isDisabled}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
            />
            {
                props.isDisabled &&
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 2 }}
                >
                    Save Profile
                </Button>
            }
        </Box>
    );
}
