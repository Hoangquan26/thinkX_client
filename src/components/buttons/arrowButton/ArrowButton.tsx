import styles from './styles.module.scss'
import { FaArrowRight } from "react-icons/fa";
export default function ArrowButton({content, props, url}: {content: string, props?: any, url?: string}) {
  const { container, iconWrapper, contentWrapper } = styles
  return (
    <button className={container} {...props}>
      <span className={contentWrapper}>
        {
          url?.length ? <a href={url}>{content}</a>: content
        }
      </span>

      <FaArrowRight/>
    </button>
  )
}
