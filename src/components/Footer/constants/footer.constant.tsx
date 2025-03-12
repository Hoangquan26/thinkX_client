import { ReactNode } from "react"
import { LanguageObject } from "../../../interfaces/language-object.interface"

import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export interface IFooterConst {
    websiteInfo: {
        description: LanguageObject,
        socials: {
            name: string,
            url: string,
            icon: ReactNode
        }[]
    },
    links: {
        services: {
            name: string,
            url: string 
        }[],
        quickLink: {
            name: string,
            url: string 
        }[]
    }
}


export const FooterConstant: IFooterConst = {
    websiteInfo: {
        description: {
            eng: `Interdum velit laoreet id donec ultrices
                tincidunt arcu. Tincidunt tortor aliquam nulla
                facilisi cras fermentum odio eu.`,
            vn: `
                Interdum velit laoreet id donec ultrices
                tincidunt arcu. Tincidunt tortor aliquam nulla
                facilisi cras fermentum odio eu.
                `
        },
        socials: [
            {
                name: "Instagram",
                url: '/',
                icon: <FaInstagram/>
            }, 
            {
                name: "Facebook",
                url: '/',
                icon: <FaFacebook/>
            },
            {
                name: "Tiktok",
                url: '/',
                icon: <FaTiktok/>
            }
        ]
    },
    links: {
        services: [
            {
                name: 'Home',
                url: '/'
            },
            {
                name: 'Categories',
                url: '/'
            },
            {
                name: 'Courses',
                url: '/'
            },
            {
                name: 'Practise',
                url: '/'
            },
            {
                name: 'Classroom',
                url: '/'
            }
        ],
        quickLink: [
            {
                name: 'Privary & policy',
                url: '/'
            },
            {
                name: 'Templates',
                url: '/'
            }
        ]
    }
}