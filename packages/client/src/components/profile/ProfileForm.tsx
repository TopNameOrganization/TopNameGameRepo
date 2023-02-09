import * as React from 'react';
import {useFormik} from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {validationProfile} from "./validation";

interface IProfile {
    [key: string]: FormDataEntryValue | null
}

export default function ProfileForm() {
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            secondName: '',
            nickName: '',
            phone: '',
            email: '',
            password: '',
        },
        validationSchema: validationProfile,
        onSubmit: (profileData: IProfile) => {
            console.log('profileData: ', profileData)
            setIsDisabled(false);
        },
    });

    const handleChangeIsDisabled = () => {
        setIsDisabled(true);
    };

    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                variant="standard"
                margin="dense"
                fullWidth
                name="firstName"
                label="First name"
                type="text"
                id="firstName"
                autoComplete="firstName"
                disabled={!isDisabled}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
                variant="standard"
                margin="dense"
                fullWidth
                name="secondName"
                label="Second name"
                type="text"
                id="secondName"
                autoComplete="secondName"
                disabled={!isDisabled}
                onChange={formik.handleChange}
                error={formik.touched.secondName && Boolean(formik.errors.secondName)}
                helperText={formik.touched.secondName && formik.errors.secondName}
            />
            <TextField
                variant="standard"
                margin="dense"
                required
                fullWidth
                name="nickName"
                label="Nick name"
                type="text"
                id="nickName"
                autoComplete="nickName"
                disabled={!isDisabled}
                onChange={formik.handleChange}
                error={formik.touched.nickName && Boolean(formik.errors.nickName)}
                helperText={formik.touched.nickName && formik.errors.nickName}
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
                disabled={!isDisabled}
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
                disabled={!isDisabled}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
                variant="standard"
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={!isDisabled}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            {
                isDisabled
                    ? (<Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5, mb: 2 }}
                    >
                        Save Profile
                    </Button>)
                    : (<Button
                        onClick={handleChangeIsDisabled}
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5, mb: 2 }}
                    >
                        Edit Profile
                    </Button>)
            }
        </Box>
    );
}
