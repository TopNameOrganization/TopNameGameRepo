import React from 'react'
import { Button, Box, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { signInFormValidationSchema } from './validation'
import { useAuth } from '../../context/AuthContext'
import { FormServerError } from '../FormServerError'

interface SignInFormData {
  login: string
  password: string
}

export function SignInForm() {
  const auth = useAuth()
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: signInFormValidationSchema,
    onSubmit: (data: SignInFormData) => {
      auth.signin.action(data)
    },
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        fullWidth
        id="login"
        label="Email Address"
        name="login"
        // autoComplete="email"
        autoFocus
        onChange={formik.handleChange}
        value={formik.values.login}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && formik.errors.login}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      {!!auth.signin.error && (
        <FormServerError message={auth.signin.error.response.data.reason} />
      )}
      <Button
        type="submit"
        disabled={auth.signin.isLoading}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  )
}
