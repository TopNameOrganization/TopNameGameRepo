import React from 'react'
import Button from '@mui/material/Button'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import { signUpFormValidationSchema } from './validation'

interface SignUpFormData {
  email: string
  login: string
  first_name: string
  second_name: string
  phone: string
  password: string
}

const generalFieldParams: Partial<TextFieldProps> = {
  margin: 'normal',
  required: true,
  fullWidth: true,
}

export function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      password_confirm: '',
    },
    validationSchema: signUpFormValidationSchema,
    onSubmit: (data: SignUpFormData) => {
      console.log('SignUpFormData: ', data)
    },
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
      <TextField
        {...generalFieldParams}
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        {...generalFieldParams}
        id="login"
        label="Login"
        name="login"
        autoComplete="login"
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && formik.errors.login}
      />
      <TextField
        {...generalFieldParams}
        id="first_name"
        label="First name"
        name="first_name"
        autoComplete="first_name"
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
      />
      <TextField
        {...generalFieldParams}
        id="second_name"
        label="Second name"
        name="second_name"
        autoComplete="second_name"
        error={formik.touched.second_name && Boolean(formik.errors.second_name)}
        helperText={formik.touched.second_name && formik.errors.second_name}
      />
      <TextField
        {...generalFieldParams}
        id="phone"
        label="Phone number"
        name="phone"
        autoComplete="phone"
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <TextField
        {...generalFieldParams}
        name="password"
        label="Password"
        type="password"
        id="password"
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        {...generalFieldParams}
        name="password_confirm"
        label="Password confirm"
        type="password"
        id="password_confirm"
        error={
          formik.touched.password_confirm &&
          Boolean(formik.errors.password_confirm)
        }
        helperText={
          formik.touched.password_confirm && formik.errors.password_confirm
        }
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={!!formik.errors.password_confirm}
        sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/signin" variant="body2">
            {'Already have an account? Sign in'}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}
