import { LanguageObject } from "@/interfaces/language-object.interface"


interface IRegisterConst {
    actionWrapper: {
        registerWithGoogle: LanguageObject,
        registerWithFacebook: LanguageObject
    },
    seperator : LanguageObject,
    mainForm: {
        email: LanguageObject,
        username: LanguageObject,
        password: LanguageObject,
        confirmPassword: LanguageObject,
        isAcceptTerm: LanguageObject,
        submitBtn: LanguageObject
    },
    others : {
        title: LanguageObject,
        alreadyHaveAccount: LanguageObject,
        redirectLogin: LanguageObject
    }
}

interface IRegisterRedirect {
    term: LanguageObject & { url: string },
    policy: LanguageObject & {url: string }
}


export const replaceAcceptTerm = {
    term: '{{{replaceTerm}}}',
    policy: '{{{replacePolicy}}}'
}

export const registerRedirect: IRegisterRedirect = {
    term: {
        vn: 'Điều khoản',
        eng: 'Terms',
        url: ''
    },
    policy: {
        vn: 'Điều kiện',
        eng: 'Policy',
        url: ''
    },
}

export const RegisterConst: IRegisterConst = {
    actionWrapper: {
        registerWithGoogle: {
            eng: 'Google',
            vn: 'Google'
        },
        registerWithFacebook: {
            eng: 'Facebook',
            vn: 'Facebook'
        }
    },
    seperator: {
        eng: 'OR CONTINUE WITH',
        vn: 'HOẶC ĐĂNG KÝ VỚI'
    },
    mainForm: {
        email: {
            eng: "Email",
            vn: "Email"
        },
        username: {
            eng: "Username",
            vn: "Tên người dùng"
        },
        password: {
            eng: "Password",
            vn: "Mật khẩu"
        },
        confirmPassword : {
            eng: `Confirm password`,
            vn: `Xác nhận nhật mật khẩu`
        },
        isAcceptTerm: {
         eng: `By creating an accont, you agree to the ${replaceAcceptTerm.term} and ${replaceAcceptTerm.policy}`,
            vn: `Để tạo tài khoản, bạn cần đồng ý với ${replaceAcceptTerm.term} và ${replaceAcceptTerm.policy}` 
        },
        submitBtn: {
            eng: "Create an account",
            vn: "Tạo tài khoản mới"
        }
    },
    others : {
        title: {
            vn: 'Tạo tài khoản mới',
            eng: 'Create an account'
        },
        alreadyHaveAccount: {
            eng: 'Already have an account?',
            vn: 'Đã có tài khoản'
        },
        redirectLogin: {
            eng: 'Log in',
            vn: 'Đăng nhập'
        }
    }
}
