import ArrowButton from '@components/buttons/arrowButton/ArrowButton';
import CourseCard from '@components/CourseCard/CourseCard';
import { courseConstant } from './constains/course.contain';
import styles from './styles.module.scss';

export default function HomeCourse() {
  const { container, contentWrapper, titleWrapper, mainWrapper, title } = styles; 
  return (
    <div className={container}>
      <div className={contentWrapper}>
        <div className={titleWrapper}>
          <h2 className={title}>
            {courseConstant.title.eng} 
          </h2>
          <ArrowButton content="Load More Course" url="/"/>
        </div>
        <div className={mainWrapper}>
          {
            courseConstant.courseItems && courseConstant.courseItems.map((item) => (
              <CourseCard key={item._id} data={item}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}
