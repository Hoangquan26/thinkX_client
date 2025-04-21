import { ICourse } from "./course.interface"

export interface ILesson {
    _id: string
    lessonTitle: string
    description?: string
    videoUrl: string
    order: number
    isPreview: boolean
    course: ICourse 
    createdAt?: string
    updatedAt?: string
    duration?: string
  }
  