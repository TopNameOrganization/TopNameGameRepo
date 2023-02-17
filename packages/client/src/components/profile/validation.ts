import * as yup from 'yup';

export const validationUserProfile = yup.object({
  first_name: yup
    .string()
    .min(3, 'First name should be of minimum 3 characters length')
    .max(20, 'First name should be of maximum 20 characters length'),
  second_name: yup
    .string()
    .min(3, 'Second name should be of minimum 3 characters length')
    .max(20, 'First name should be of maximum 20 characters length'),
  display_name: yup
    .string()
    .min(3, 'Display name should be of minimum 3 characters length')
    .max(20, 'Display name should be of maximum 20 characters length')
    .required('Display name is required'),
  login: yup
    .string()
    .min(3, 'Login should be of minimum 3 characters length')
    .max(20, 'Login should be of maximum 20 characters length')
    .required('Login is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .min(11, 'Phone should be of minimum 11 characters length')
    .max(12, 'Phone should be of maximum 12 characters length')
    .required('Phone is required')
});

export const validationUserPassword = yup.object({
  oldPassword: yup
    .string()
    .min(8, 'Old password should be of minimum 8 characters length')
    .required('Old password is required'),
  newPassword: yup
    .string()
    .min(8, 'New password should be of minimum 8 characters length')
    .required('New password is required'),
});
