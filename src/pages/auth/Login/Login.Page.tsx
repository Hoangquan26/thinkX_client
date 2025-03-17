import RoundedButton from '@/components/buttons/RoundedButton/RoundedButton';
import styles from './styles.module.scss';
import { useFormik } from 'formik';
import CommonInput from '@/components/Inputs/Common.Input/Common.Input';
import { Link } from 'react-router';
import { loginValidatorSchema } from '@/common/validators/login.validator.schema';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const { container, contentWrapper, actionWrapper, mainGroup, moreGroup, moreTitle,
    forgotPasswordWrapper, errorLabel, rememberWrapper, seperator, seperatorWrapper, seperatorTitle } = styles;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      isRemember: false
    },
    validationSchema: loginValidatorSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  console.log(formik.values)
  return (
    <div className={container}>
      <div className={contentWrapper}>
        {/* BUTTON GROUP */}
        <div className={actionWrapper}>
          <RoundedButton icon={<FcGoogle/>} content='Continue with Google' />
          <RoundedButton icon={<FaFacebook className=' text-[#0165E1]'/>} content='Continue with Facebook' />
        </div>
        <div className={seperatorWrapper}>
          <Separator className={seperator}/>
          <h4 className={seperatorTitle}>OR</h4>
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
          
          <div className={rememberWrapper}>
            <Checkbox 
            name='isRemember'
            id='isRemember'
            value={'formik.values.isRemember'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="isRemember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Rememeber login
              </label>
            </div>
          </div>

          <RoundedButton isPrimary={true} isDisabled={ !formik.isValid || formik.isSubmitting} content='Login' />
        </form>
        <Separator className={seperator}/>
        {/* ANOTHER ACTION GROUP */}
        <div className={moreGroup}>
          <h2 className={moreTitle}>Don't have an account</h2>
          <RoundedButton content='Sign up' />
        </div>
      </div>
    </div>
  );
}
