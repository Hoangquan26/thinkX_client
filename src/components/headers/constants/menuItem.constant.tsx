import { IoSearchOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { LanguageObject } from "@interfaces/language-object.interface";

// define interfaces
export interface MenuItem {
    content: LanguageObject,
    url?: string,
    logo?: React.ReactNode
}

export interface MenuAction {
    logo: React.ReactNode,
    action?: () => {}
}


//define constants
export const menuItems: MenuItem[] = [
    {
        content: {
            eng: 'Home',
            vn: 'Trang chủ'
        },
        url: '/'
    },
    {
        content: {
            eng: 'Browser',
            vn: 'Khám phá'
        },
        url: '/browser'
    },
    {
        content: {
            eng: 'Learning',
            vn: 'Học tập'
        },
        url: '/learning'
    },
    {
        content: {
            eng: 'Setting',
            vn: 'Cài đặt'
        },
        url: '/setting'
    },
    {
        content: {
            eng: 'Contact',
            vn: 'Liên hệ'
        },
        url: '/contact'
    },
    
]

export const menuActions: MenuAction[] = [
    {
        logo: <IoSearchOutline/>
    },
    {
        logo: <IoMenuOutline/>
    }
]