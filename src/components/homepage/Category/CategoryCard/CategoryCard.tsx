import { ICategoryModel } from '../../../../interfaces/models/category-model.interface'
import styles from './styles.module.scss'
export default function CategoryCard({categoryName, categoryThumb= ""}: ICategoryModel) {
    const { container, description} = styles    
    return (
        <div className={container}>
            {categoryName}
            {/* <p className={description}>
                Yes, the constant structure you have created is appropriate for a multi-language website. 
                It uses an object to store text in different languages, which can be easily accessed based 
                on the selected language.
                Yes, the constant structure you have created is appropriate for a multi-language website. 
                It uses an object to store text in different languages, which can be easily accessed based 
                on the selected language.
            </p> */}
        </div>
)
}
