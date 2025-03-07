import CategoryCard from './CategoryCard/CategoryCard';
import { categoryConstant } from './constants/category.constant';
import styles from './styles.module.scss';
export default function () {
    const { container, title, contentWrapper, categoriesWrapper } = styles;  
    return (
        <div className={container}>
            <div className={contentWrapper}>
                <h2 className={title}>{categoryConstant.title.eng}</h2>

                <div className={categoriesWrapper}>
                    {
                        categoryConstant.categoryItems && categoryConstant.categoryItems.map((category, key) => (
                            <CategoryCard categoryName={category.categoryName} key={key}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
