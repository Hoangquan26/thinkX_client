import styles from './style.module.scss'
export default function Copyright({websiteName= '...'}) {
    const { container } = styles
    return (
        <div className={container}>Copyright by @2024 {websiteName} || All right reversed</div>
    )
}
