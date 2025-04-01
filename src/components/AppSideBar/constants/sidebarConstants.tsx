import { routerConfig } from "@/configs/router.config";
import { LanguageObject } from "@/interfaces/language-object.interface"
import { ReactNode } from "react"

import { FiLogIn } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
interface ISidebarFooter {
    loginMenu: {
        content: LanguageObject,
        icon?: ReactNode,
        url: string
    },
    registerMenu: {
        content: LanguageObject,
        icon?: ReactNode,
        url: string
    },
}

interface ISidebar {
    footer : ISidebarFooter
}

export const sidebarConstant: ISidebar = {
    footer: {
        loginMenu: {
            content: {
                eng: 'Login',
                vn: 'Đăng nhập'
            },
            icon: <FiLogIn/>,
            url: routerConfig.login
        },
        registerMenu: {
            content: {
                eng: 'Register',
                vn: 'Đăng ký'
            },
            icon:  <IoCreateOutline/>,
            url: routerConfig.register
        }
    }
}