import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - length of 8 minimum')
    .matches(/^(?=.*[.\!@#$%^&*,])/, 'It must contain a special symbol: !@#$%^&*,.'),
});

export const signupValidationSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - length of 8 minimum')
    .matches(/^(?=.*[.\!@#$%^&*,])/, 'It must contain a special symbol: !@#$%^&*,.'),
  confirmPassword: Yup.string()
    .label('confirmPassword')
    .required('Confirming password is required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

export const logoutValidationSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - length of 8 minimum')
    .matches(/^(?=.*[.\!@#$%^&*,])/, 'It must contain a special symbol: !@#$%^&*,.'),
});
