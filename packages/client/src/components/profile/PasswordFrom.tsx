import * as React from 'react';
import {useFormik} from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {validationUserPassword} from "./validation";
import {UserPasswordData} from "../../api/types";
import UsersAPI from "../../api/UsersAPI";

export const PasswordForm = (props: any) => {

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: ''
    },
    validationSchema: validationUserPassword,
    onSubmit: (passwordData: UserPasswordData) => {
      UsersAPI.changeUserPassword(passwordData)
      props.noUseForm()
    },
  });

  return (
      <Box id="passwordForm" component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            variant="standard"
            margin="dense"
            required
            fullWidth
            name="oldPassword"
            label="Old password"
            type="password"
            id="oldPassword"
            autoComplete="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        />
        <TextField
            variant="standard"
            margin="dense"
            required
            fullWidth
            name="newPassword"
            label="New password"
            type="password"
            id="newPassword"
            autoComplete="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
        >
          Save Password
        </Button>
      </Box>
  );
}
