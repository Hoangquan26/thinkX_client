import { defaultApi } from "@/api/api"
import { ENDPOINT } from "@/configs/api.config"
import ISuccessResponse, { IPaginatedResponse } from "@/interfaces/ISuccessResponse"
import { ILesson } from "@/interfaces/lesson.interface"

const lessonService = {
  // 👨‍🎓 Public / Authenticated
  getLessonById: async (id: string): Promise<ISuccessResponse> => {
    return await defaultApi.get(ENDPOINT.v1.lesson.getById(id))
  },

  // 🧑‍🏫 Instructor APIs
  getAllMyLessons: async (): Promise<ISuccessResponse> => {
    return await defaultApi.get(ENDPOINT.v1.lesson.instructor.allMyLessons)
  },
  
  getLessonsByCourseId: async (courseId: string): Promise<ISuccessResponse> => {
    return await defaultApi.get(ENDPOINT.v1.lesson.instructor.getByCourseId(courseId))
  },

  createLesson: async (payload: Partial<ILesson>): Promise<ISuccessResponse> => {
    return await defaultApi.post(ENDPOINT.v1.lesson.instructor.create, payload)
  },

  updateLesson: async (id: string, payload: Partial<ILesson>): Promise<ISuccessResponse> => {
    return await defaultApi.patch(ENDPOINT.v1.lesson.instructor.update(id), payload)
  },

  deleteLesson: async (id: string): Promise<ISuccessResponse> => {
    return await defaultApi.delete(ENDPOINT.v1.lesson.instructor.delete(id))
  },

  // 🛡️ Admin APIs
  getAllLessonsForAdmin: async (params: {
    page: number,
    limit: number,
    query?: string,
    courseId?: string
  }): Promise<IPaginatedResponse<ILesson>> => {
    return await defaultApi.get(ENDPOINT.v1.lesson.admin.getAll, { params })
  },

  forceDeleteLesson: async (id: string): Promise<ISuccessResponse> => {
    return await defaultApi.delete(ENDPOINT.v1.lesson.admin.delete(id))
  }
}

export default lessonService
