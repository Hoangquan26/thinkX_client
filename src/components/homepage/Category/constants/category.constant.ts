import { LanguageObject } from '../../../../interfaces/language-object.interface'
import { ICategoryModel } from '../../../../interfaces/models/category-model.interface'

export interface CategorySectionInterface {
    title: LanguageObject 
    categoryItems: ICategoryModel[]   
}

export const categoryConstant: CategorySectionInterface = {
    title: {
        eng: 'Browser By Categories',
        vn: 'Tìm kiếm bằng danh mục'
    },
    categoryItems: [
        {
            categoryName: 'Information Technology'
        },
        {
            categoryName: 'Art & Design'
        }, 
        {
            categoryName: 'Code For Kid'
        },
        {
            categoryName: 'Art For Kid'
        },
        {
            categoryName: 'UI/UX Design'
        },
        {
            categoryName: 'Testing'
        }
    ]
}