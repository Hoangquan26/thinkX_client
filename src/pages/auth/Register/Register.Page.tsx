import { signupValidator } from "@/common/validators/signup.validator.schema";
import { useFormik } from "formik";
import styles from './styles.module.scss'
import { Link, useNavigate } from "react-router";
import CommonInput from "@/components/Inputs/Common.Input/Common.Input";
import { Checkbox } from "@/components/ui/checkbox";
import RoundedButton from "@/components/buttons/RoundedButton/RoundedButton";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import ErrorLabel from "@/components/ErrorLabel/ErrorLabel";
import { RegisterConst } from "./constants/Register.constant";
import AuthService from "@/services/auth.service";
import { StatusCodes } from "@/common/statusCodes/httpStatusCode";
import { useDispatch } from "react-redux";
import { ErrorToast, SuccessToast } from "@/utils/toastify.util";
import { routerConfig } from "@/configs/router.config";
export default function RegisterPage() {
  const { 
    container, contentWrapper, 
    titleContainer, title, 
    formContainer, 
    socialContainer, socialWrapper, 
    termWrapper, loginLink,
    
  } = styles

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',     
      password: '',
      confirmPassword: '',
      acceptTerm: false
    },
    validationSchema: signupValidator,
    onSubmit: async(values) => {
      const { email, password } = values;
      const response = await AuthService.register({ email, password });    
      if (response?.status === StatusCodes.CREATED) {
        const message = response.message ?? "Success";
        SuccessToast(message);
  
        setTimeout(() => {
          navigate(routerConfig.login);
        }, 3000);  
      } }
    });

  console.log(formik)
  return (
    <div className={container}>
      <div className={contentWrapper}>
          {/* Title container */}
          <div className={titleContainer}>
            <h2 className={title}>{RegisterConst.others.title.eng}</h2>
            <p className={loginLink}>{RegisterConst.others.alreadyHaveAccount.eng} <Link to={'/login'}>{RegisterConst.others.redirectLogin.eng}</Link></p>
          </div>

          {/* Main form container */}
          <form onSubmit={formik.handleSubmit} className={formContainer}>
            <CommonInput
              label={RegisterConst.mainForm.email.eng}
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
              label={RegisterConst.mainForm.password.eng}
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
              label={RegisterConst.mainForm.confirmPassword.eng}
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
              name='acceptTerm'
              id='acceptTerm'
              checked={formik.values.acceptTerm}
              onCheckedChange={(checked) => {
                formik.setFieldValue("acceptTerm", checked);
              }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="acceptTerm"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {RegisterConst.mainForm.isAcceptTerm.eng}
                </label>
              </div>
            </div>
            {formik.touched.acceptTerm && formik.errors.acceptTerm ? (
              <ErrorLabel content={formik.errors.acceptTerm}/>
            ) : null}

            <RoundedButton type="submit" isPrimary={true} isDisabled={ !formik.isValid || formik.isSubmitting || !Object.keys(formik.touched).length} 
              content={RegisterConst.mainForm.submitBtn.eng}
            />
          </form>
          
          <Separator/>

          {/* Signup by socials container */}
          <div className={socialContainer}>
            <h3>{RegisterConst.seperator.eng}</h3>
            <div className={socialWrapper}>
              <RoundedButton icon={<FcGoogle/>} content={RegisterConst.actionWrapper.registerWithGoogle.eng}/>
              <RoundedButton icon={<FaFacebook className=' text-[#0165E1]'/>} content={RegisterConst.actionWrapper.registerWithFacebook.eng}/>
            </div>
          </div>
      </div>
    </div>
  )
}
