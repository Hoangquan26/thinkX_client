import { signupValidator } from "@/common/validators/signup.validator.schema";
import { useFormik } from "formik";
import styles from './styles.module.scss'
import { Link } from "react-router";
import CommonInput from "@/components/Inputs/Common.Input/Common.Input";
import { Checkbox } from "@/components/ui/checkbox";
import RoundedButton from "@/components/buttons/RoundedButton/RoundedButton";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import ErrorLabel from "@/components/ErrorLabel/ErrorLabel";
export default function RegisterPage() {
  const { 
    container, contentWrapper, 
    titleContainer, title, 
    formContainer, 
    socialContainer, socialWrapper, 
    errorLabel, termWrapper, loginLink,
    
  } = styles
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerm: false
    },
    validationSchema: signupValidator,
    onSubmit: (values) => {
      console.log(values);
    }
  });


  return (
    <div className={container}>
      <div className={contentWrapper}>
          {/* Title container */}
          <div className={titleContainer}>
            <h2 className={title}>Create an account</h2>
            <p className={loginLink}>Already have an account? <Link to={'/login'}>Log in</Link></p>
          </div>

          {/* Main form container */}
          <div className={formContainer}>
            <CommonInput
              label='Email'
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
                <ErrorLabel content={formik.errors.password}/>
              ) : null}
            <CommonInput
              label='Confirm password'
              name='confirmPassword'
              id='confirmPassword'
              type='confirmPassword'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              canHide={true}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <ErrorLabel content={formik.errors.confirmPassword}/>
            ) : null}

            <div className={termWrapper}>
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
                  By creating an accont, you agree to the <Link to={'/'}>Terms</Link> and <Link to={'/'}>Policty</Link>
                </label>
              </div>
            </div>

            <RoundedButton isPrimary={true} isDisabled={ !formik.isValid || formik.isSubmitting} content="Create an account"/>
          </div>
          
          <Separator/>

          {/* Signup by socials container */}
          <div className={socialContainer}>
            <h3>OR CONTINUE WITH</h3>
            <div className={socialWrapper}>
              <RoundedButton icon={<FcGoogle/>} content="Google"/>
              <RoundedButton icon={<FaFacebook className=' text-[#0165E1]'/>} content="Facebook"/>
            </div>
          </div>
      </div>
    </div>
  )
}
