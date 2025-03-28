import { ICourseModel } from '../../interfaces/models/course-model.interface'
import { getStarString } from '../../interfaces/models/rating.interface'
import { IoMdTime } from "react-icons/io";
import { TiDocumentText } from "react-icons/ti";
import styles from './styles.module.scss'
import UserContainer from '@/components/UserContainer/UserContainer';
import ArrowButton from '@/components/buttons/arrowButton/ArrowButton';
export default function CourseCard({data, props}: {data: ICourseModel, props: any}) {
  const { container, actionWrapper, imageWrapper, image, mainDesWrapper, secondDesWrapper, rating, title, price, lessonWrapper, lessonLengthWrapper, studentCountWrapper } = styles
  return (
    <div className={container}>
      <div className={imageWrapper}>
        <img className={image} src={data.courseThumb}></img>
      </div>
      <div className={mainDesWrapper}>
        <span className={rating}>{getStarString(data.courseRating)}</span>
        <span className={price}>{data.coursePrice.toLocaleString('en-US', {
          currency: "USD",
          style: "currency"
        })}</span>
      </div>
      <h4 className={title}>{data.courseName}</h4>

      <div className={secondDesWrapper}>
        <span className={lessonWrapper}>
          <TiDocumentText/>
          <span>Lesson {data.courseLessonCount}</span>
        </span>

        <span className={lessonLengthWrapper}>
          <IoMdTime/>
          <span>{data.courseLength}</span>
        </span>
      </div>


      <div className={actionWrapper}>
        <UserContainer/>
        <ArrowButton content="Enroll" url="/"/>
      </div>
    </div>
  )
}
