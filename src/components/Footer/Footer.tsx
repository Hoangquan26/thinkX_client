import styles from './styles.module.scss'

export default function Footer() {
    const { container, contentWrapper } = styles 
    return (
        <div className={container}>
            <div className={contentWrapper}>
                Footer
            </div>
        </div>
    )
}
