import ArrowButton from '@components/buttons/arrowButton/ArrowButton';
import { bannerConstant } from './constants/banner.constants';
import styles from './styles.module.scss';
export default function Banner() {
    const { container, contentWrapper, contentSide, posterSider, welcomeText, sloganText, descriptionText } = styles
    return (
        <div className={container}>
            <div className={contentWrapper}>
                <div className={contentSide}>
                    <h4 className={welcomeText}>{bannerConstant.welcomeText.eng}</h4>
                    <h1 className={sloganText}>{bannerConstant.sloganText.eng}</h1>
                    <p className={descriptionText}>{bannerConstant.descriptionText.eng}</p>
                    <ArrowButton url={bannerConstant.button_findCourseText.url} content={bannerConstant.button_findCourseText.eng}/>
                </div>

                <div className={posterSider}>
                </div>
            </div>
        </div>
    )
}
