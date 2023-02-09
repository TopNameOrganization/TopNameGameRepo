import * as yup from 'yup';

export const validationProfile = yup.object({
  firstName: yup
    .string()
    .min(3, 'First name should be of minimum 3 characters length')
    .max(20, 'First name should be of maximum 20 characters length'),
  secondName: yup
    .string()
    .min(3, 'Second name should be of minimum 3 characters length')
    .max(20, 'First name should be of maximum 20 characters length'),
  nickName: yup
    .string()
    .min(3, 'Password should be of minimum 3 characters length')
    .max(20, 'First name should be of maximum 20 characters length')
    .required('Nick name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .min(12, 'Phone should be of minimum 12 characters length')
    .max(12, 'Phone should be of maximum 12 characters length')
    .required('Phone is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
