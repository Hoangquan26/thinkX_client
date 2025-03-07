import { LanguageObject } from "@interfaces/language-object.interface"
import { LinkObject } from "@interfaces/link-object.interface"

export const bannerConstant: {
    // banner Text
    welcomeText: LanguageObject,
    sloganText: LanguageObject,
    descriptionText: LanguageObject,
    
    // banner button Text
    button_findCourseText: LanguageObject & LinkObject
} = {
    welcomeText: {
        eng: 'Welcome to UDEMY ONLINE COURSE',
        vn: 'Xin chào đã đến với UDEMY'
    },
    sloganText: {
        eng: 'Achieving Your Dreams Through Education',
        vn: 'Đạt được ước mơ của bạn thông qua tri thức'
    },
    descriptionText: {
        eng: 
            `We are experienced in educationl platform and skilled strategies
            for the success of our online learning.`,
        vn: ``
    },
    button_findCourseText: {
        eng: `Find courses`,
        vn: `Khám phá khóa học`,
        url: '/browser'
    }
}