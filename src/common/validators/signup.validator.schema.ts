import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE, USERNAME_RULE, USERNAME_RULE_MESSAGE } from '@/utils/validators';
import * as Yup from 'yup';

export const signupValidator = Yup.object().shape({
    email: Yup.string().required('Email is required').matches(EMAIL_RULE, EMAIL_RULE_MESSAGE),
    password: Yup.string().required('Password is required').matches(PASSWORD_RULE, PASSWORD_RULE_MESSAGE),
    username: Yup.string().required('Username is required').matches(USERNAME_RULE, USERNAME_RULE_MESSAGE) ,
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