import styles from './styles.module.scss'

export default function UserContainer({}) {
    const { container, imageWrapper, userContent, image } = styles;
    return (
    <div className={container}>
        <div className={imageWrapper}>
            <img className={image} src='https://www.iconarchive.com/download/i113145/fa-team/fontawesome/FontAwesome-User.1024.png'></img>
        </div>

        <span className={userContent}>Người dùng</span>
    </div>
  )
}
