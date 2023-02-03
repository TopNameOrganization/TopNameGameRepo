import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Profile from "../../components/profile/Profile";

const theme = createTheme();

export default function ProfilePage() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Profile page
                </Typography>
                <Profile />
            </Container>
        </ThemeProvider>
    );
}
