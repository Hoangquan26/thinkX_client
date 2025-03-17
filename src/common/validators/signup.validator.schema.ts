import * as Yup from 'yup';

export const signupValidator = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().min(6)
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    acceptTerm: Yup.boolean().required().equals([true], "You must accept term & policy to continue") 
});

export type signupSchema = {
  email: string,
  password: string,
  confirmPassword: string,
  acceptTerm: boolean
};