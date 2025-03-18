import { LanguageObject } from "@/interfaces/language-object.interface"

interface ILoginConst {
    actionWrapper: {
        loginWithGoogle: LanguageObject,
        loginWithFacebook: LanguageObject
    },
    seperator : LanguageObject,
    mainForm: {
        email: LanguageObject,
        password: LanguageObject,
        forgetPassword: LanguageObject,
        isRemeber: LanguageObject,
        submitBtn: LanguageObject
    }
}

export const LoginConst: ILoginConst = {
    actionWrapper: {
        loginWithGoogle: {
            eng: 'Continue with Google',
            vn: 'Đăng nhập với Google'
        },
        loginWithFacebook: {
            eng: 'Continue with Facebook',
            vn: 'Đăng nhập với Facebook'
        }
    },
    seperator: {
        eng: 'OR',
        vn: 'HOẶC'
    },
    mainForm: {
        email: {
            eng: "Email",
            vn: "Email"
        },
        password: {
            eng: "Password",
            vn: "Mật khẩu"
        },
        forgetPassword: {
            eng: 'Forget your password?',
            vn: 'Quên mật khẩu?'
        },
        isRemeber: {
            eng: "Rememeber login",
            vn: "Lưu đăng nhập"
        },
        submitBtn: {
            eng: "Login",
            vn: "Đăng nhập"
        }
    }
}