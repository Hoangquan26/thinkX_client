import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '@/utils/validators';
import * as Yup from 'yup'
export const loginValidatorSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').matches(EMAIL_RULE, EMAIL_RULE_MESSAGE),
  // password: Yup.string().required('Password is required').matches(PASSWORD_RULE, PASSWORD_RULE_MESSAGE)
});

export type loginSchema = {
    email: string,
    password: string,
    isRemember: boolean
}