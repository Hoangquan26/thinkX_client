import styles from './styles.module.scss'

import { useLocation } from "react-router"

export default function LoadingSpinner() {
    const { ldsRing } = styles
    const location = useLocation()
     
    return (
        <div className={ldsRing}><div></div><div></div><div></div><div></div></div>
    )
}
