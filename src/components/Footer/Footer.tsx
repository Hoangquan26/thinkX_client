import { Link } from 'react-router'
import { FooterConstant } from './constants/footer.constant'
import styles from './styles.module.scss'

export default function Footer() {
    const { container, contentWrapper, websiteInfo, linkWrapper, socialWrapper, socialItem, linkItem, linkSide, linkTitle } = styles 
    return (
        <div className={container}>
            <div className={contentWrapper}>
                <div className={websiteInfo}>
                    <h1>Logo</h1>
                    <p>
                        {
                            FooterConstant.websiteInfo.description.eng
                        }
                    </p>
                    <div className={socialWrapper}>
                        {
                            FooterConstant.websiteInfo.socials && FooterConstant.websiteInfo.socials.map(item => (
                                <Link className={socialItem} key={item.name} to={item.url}>
                                    {item.icon}
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className={linkWrapper}>
                    <div className={linkSide}>
                        <h2 className={linkTitle}>Our Services:</h2>
                        {
                            FooterConstant.links.services && FooterConstant.links.services.map((item) => (
                                <Link className={linkItem} key={item.name} to={item.url}>{item.name}</Link>
                            ))
                        }
                    </div>
                    <div className={linkSide}>
                        <h2 className={linkTitle}>Quick Link:</h2>
                        {
                            FooterConstant.links.quickLink && FooterConstant.links.quickLink.map((item) => (
                                <Link className={linkItem} key={item.name} to={item.url}>{item.name}</Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
