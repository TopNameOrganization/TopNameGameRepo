import React from 'react'
import Button from '@mui/material/Button'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import { signUpFormValidationSchema } from './validation'
import { useAuth } from '../../context/AuthContext'
import { FormServerError } from '../FormServerError'

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
  fullWidth: true,
}

export function SignUpForm() {
  const auth = useAuth()
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
      auth.signup(data)
    },
  })

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
      <TextField
        {...generalFieldParams}
        id="email"
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        {...generalFieldParams}
        id="login"
        label="Login"
        name="login"
        autoComplete="login"
        onChange={formik.handleChange}
        value={formik.values.login}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && formik.errors.login}
      />
      <TextField
        {...generalFieldParams}
        id="first_name"
        label="First name"
        name="first_name"
        autoComplete="first_name"
        onChange={formik.handleChange}
        value={formik.values.first_name}
        error={Boolean(formik.errors.first_name) && formik.touched.first_name}
        helperText={formik.touched.first_name && formik.errors.first_name}
      />
      <TextField
        {...generalFieldParams}
        id="second_name"
        label="Second name"
        name="second_name"
        autoComplete="second_name"
        onChange={formik.handleChange}
        value={formik.values.second_name}
        error={formik.touched.second_name && Boolean(formik.errors.second_name)}
        helperText={formik.touched.second_name && formik.errors.second_name}
      />
      <TextField
        {...generalFieldParams}
        id="phone"
        label="Phone number"
        name="phone"
        type="tel"
        autoComplete="phone"
        onChange={formik.handleChange}
        value={formik.values.phone}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <TextField
        {...generalFieldParams}
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        {...generalFieldParams}
        name="password_confirm"
        label="Password confirm"
        type="password"
        id="password_confirm"
        onChange={formik.handleChange}
        value={formik.values.password_confirm}
        error={
          formik.touched.password_confirm &&
          Boolean(formik.errors.password_confirm)
        }
        helperText={
          formik.touched.password_confirm && formik.errors.password_confirm
        }
      />
      {!!auth.signupError && (
        <FormServerError message={auth.signupError.response.data.reason} />
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  )
}
