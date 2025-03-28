import { ICourseModel } from '@/interfaces/models/course-model.interface'
import styles from './styles.module.scss'
import { getStarString } from '@/interfaces/models/rating.interface'
import { Button } from '../ui/button'
export default function HorizontalCourse({course} : {course: ICourseModel}) {
    const { container, imageWrapper, infoWrapper, functionWrapper } = styles
    return (
        <div className={container}>
            <div className={imageWrapper}>
                <img src={`${course?.courseThumb}`} alt={`hinh-anh-${course.courseSlug}`}/>
            </div>
            <div className={infoWrapper}>
                <h3>{course.courseName}</h3>
                <h4>{course.courseCategoryName}</h4>
                <h5>{course.courseAuthorName}</h5>
                <p className=' text-yellow-400'>{getStarString(course.courseRating)}</p>
                <h5>{course.courseLength} * {course.courseLessonCount}</h5>
            </div>
            <div className={functionWrapper}>
                <Button className=' w-full cursor-pointer' variant={'default'}>Enroll</Button>
                <Button className=' w-full cursor-pointer' variant={'secondary'}>Add to cart</Button>
            </div>
        </div>
    )
}
