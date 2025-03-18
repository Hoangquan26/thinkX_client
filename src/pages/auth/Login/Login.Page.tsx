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
import ErrorLabel from '@/components/ErrorLabel/ErrorLabel';
import { LoginConst } from './constants/Login.contants';

export default function LoginPage() {
  const { container, contentWrapper, actionWrapper, mainGroup, moreGroup, moreTitle,
    forgotPasswordWrapper, rememberWrapper, seperator, seperatorWrapper, seperatorTitle } = styles;

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
          <RoundedButton icon={<FcGoogle/>} content={LoginConst.actionWrapper.loginWithGoogle.eng} />
          <RoundedButton icon={<FaFacebook className=' text-[#0165E1]'/>} content={LoginConst.actionWrapper.loginWithFacebook.eng} />
        </div>
        <div className={seperatorWrapper}>
          <Separator className={seperator}/>
          <h4 className={seperatorTitle}>{LoginConst.seperator.eng}</h4>
        </div>
        {/* LOGIN GROUP */}
        <form onSubmit={formik.handleSubmit} className={mainGroup}>
          <CommonInput
            label={LoginConst.mainForm.email.eng}
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <ErrorLabel content={formik.errors.email}/>
          ) : null}
          <CommonInput
            label={LoginConst.mainForm.password.eng}
            name='password'
            id='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            canHide={true}
          />
          {formik.touched.password && formik.errors.password ? (
            <ErrorLabel content={formik.errors.password}/>
          ) : null}

          <div className={forgotPasswordWrapper}>
            <Link to={'/'}>{LoginConst.mainForm.forgetPassword.eng}</Link>
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
                {LoginConst.mainForm.isRemeber.eng}
              </label>
            </div>
          </div>

          <RoundedButton  
            type="submit" isPrimary={true} 
            isDisabled={  !formik.isValid || formik.isSubmitting || !Object.keys(formik.touched).length} 
            content={LoginConst.mainForm.submitBtn.eng} />
          
        </form>
        <Separator className={seperator}/>
        {/* ANOTHER ACTION GROUP */}
        <div className={moreGroup}>
          <h2 className={moreTitle}>Don't have an account?</h2>
          <RoundedButton content='Sign up' />
        </div>
      </div>
    </div>
  );
}
