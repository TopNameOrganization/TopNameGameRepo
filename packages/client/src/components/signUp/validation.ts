import * as yup from 'yup'
import { phoneRegExp } from './constants'

export const signUpFormValidationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  login: yup
    .string()
    .min(8, 'Login should be of minimum 8 characters length')
    .required('Login is required'),
  first_name: yup.string().required('First name is required'),
  second_name: yup.string().required('Second name is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
})
