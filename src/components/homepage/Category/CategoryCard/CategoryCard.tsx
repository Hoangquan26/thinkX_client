import { ICategoryModel } from '../../../../interfaces/models/category-model.interface'
import styles from './styles.module.scss'
export default function CategoryCard({categoryName, categoryUrl = "/", categoryThumb= "https://cdn2.iconfinder.com/data/icons/laptop-and-desktop-1/512/Code_Computer-1024.png"}: ICategoryModel) {
    const { container, title, thumb} = styles    
    return (
        <a href={categoryUrl} className={container}>
            { categoryThumb && <img className={thumb} src={categoryThumb}/>}
            <p className={title}>{categoryName}</p>
        </a>
)
}
