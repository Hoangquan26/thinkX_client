import RoundedButton from '@/components/buttons/RoundedButton/RoundedButton';
import styles from './styles.module.scss';
import { useFormik } from 'formik';
import CommonInput from '@/components/Inputs/Common.Input/Common.Input';
import { Link } from 'react-router';
import { loginValidatorSchema } from '@/common/validators/login.validator.schema';

export default function LoginPage() {
  const { container, contentWrapper, actionWrapper, mainGroup, moreGroup, forgotPasswordWrapper, errorLabel } = styles;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginValidatorSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div className={container}>
      <div className={contentWrapper}>
        {/* BUTTON GROUP */}
        <div className={actionWrapper}>
          <RoundedButton content='Continue with Google' />
          <RoundedButton content='Continue with Facebook' />
        </div>

        {/* LOGIN GROUP */}
        <form onSubmit={formik.handleSubmit} className={mainGroup}>
          <CommonInput
            label='Email'
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className={errorLabel}>{formik.errors.email}</span>
          ) : null}
          <CommonInput
            label='Password'
            name='password'
            id='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            canHide={true}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className={errorLabel}>{formik.errors.password}</span>
          ) : null}

          <div className={forgotPasswordWrapper}>
            <Link to={'/'}>Forget your password</Link>
          </div>
          
          <RoundedButton isPrimary={true} isDisabled={ !formik.isValid || formik.isSubmitting} content='Login' />
        </form>

        {/* ANOTHER ACTION GROUP */}
        <div className={moreGroup}></div>
      </div>
    </div>
  );
}
