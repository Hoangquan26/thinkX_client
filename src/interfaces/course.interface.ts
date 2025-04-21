import { IUser } from "./user.interface"
import { ICategory } from "./category.interface"
import { ILesson } from "./lesson.interface"
import { CourseStatus } from '@/common/constants/courseStatus'

export interface ICourse {
  _id: string
  courseName: string
  slug: string
  courseDescription: string
  coursePrice: number
  courseThumb: string
  courseLength: string
  courseLessonCount: number
  courseRating: number
  courseStudentCount: number
  status: CourseStatus
  feedback?: string
  category: ICategory
  instructor:  IUser
  lessons?: ILesson[]
  createdAt?: string
  updatedAt?: string
}
