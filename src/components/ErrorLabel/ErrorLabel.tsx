import styles from './styles.module.scss'
export default function ErrorLabel({content = ""}) {
    const { errorLabel } = styles
    return (
        <div className={errorLabel}>{content}</div>
    )
}
