import { defaultApi } from "@/api/api";
import { IUser } from "@/interfaces/user.interface";
import { ICourse } from "@/interfaces/course.interface";
import { IPaginatedResponse } from "@/interfaces/ISuccessResponse";
import ISuccessResponse from "@/interfaces/ISuccessResponse";
import { ENDPOINT } from "@/configs/api.config";

const courseService = {
  // 🔓 Public
  getAllPublicCourses: async ({
    page = 1,
    limit = 10,
    query = "",
    sortField = "createdAt", 
    sortOrder = -1
  }: {
    page?: number;
    limit?: number;
    query?: string;
    sortField?: string;
    sortOrder?: number;
  }): Promise<IPaginatedResponse<ICourse[]>> => {
    return await defaultApi.get(ENDPOINT.v1.course.public.all({page, limit, query, sortField, sortOrder}));
  },

  getCoursesByCategorySlug: async (slug: string) => {
    return await defaultApi.get<ICourse[]>(`/v1/courses/public-by-category/${slug}`);
  },

  getCourseDetailBySlug: async (slug: string): Promise<ISuccessResponse> => {
    return await defaultApi.get(`/v1/courses/${slug}`) as ISuccessResponse;
  },

  getPublicLessonsByCourseId: async (id: string) => {
    return await defaultApi.get(ENDPOINT.v1.course.public.lessons(id));
  },

  getLearningLessonsByCourseId: async (id: string) => {
    return await defaultApi.get(ENDPOINT.v1.course.public.learningLessons(id));
  },

  // 🔐 Instructor APIs
  getMyCourses: async (): Promise<ISuccessResponse> => {
    return await defaultApi.get(ENDPOINT.v1.course.instructor.myCourses);
  },
  getCourseDetailByInstructor: async (id: string): Promise<ISuccessResponse> => {
    return await defaultApi.get(ENDPOINT.v1.course.instructor.detailById(id)) as ISuccessResponse;
  },

  createCourse: async (payload: Partial<ICourse>) => {
    return await defaultApi.post<ISuccessResponse>("/v1/courses", payload);
  },

  updateCourse: async (id: string, payload: Partial<ICourse>) => {
    return await defaultApi.patch<ISuccessResponse>(`/v1/courses/${id}`, payload);
  },

  deleteCourse: async (id: string) => {
    return await defaultApi.delete<ISuccessResponse>(`/v1/courses/${id}`);
  },

  draftCourse: async (id: string) => {
    return await defaultApi.patch<ISuccessResponse>(ENDPOINT.v1.course.instructor.draft(id));
  },

  publishCourse: async (id: string) => {
    return await defaultApi.post<ISuccessResponse>(`/v1/courses/${id}/publish`);
  },

  // 🛡️ Admin APIs
  getAllCoursesByAdmin: async (params: {
    page?: number;
    limit?: number;
    query?: string;
    status?: string;
  }): Promise<IPaginatedResponse<ICourse>> => {
    return await defaultApi.get(ENDPOINT.v1.course.admin.all, { params });
  },

  getCourseDetailByAdmin: async (id: string): Promise<ICourse> => {
    return await defaultApi.get(`/v1/courses/admin/${id}`);
  },

  approveCourse: async (id: string) => {
    return await defaultApi.patch<ISuccessResponse>(`/v1/courses/admin/${id}/approve`);
  },

  rejectCourse: async (id: string, feedback: string) => {
    return await defaultApi.patch<ISuccessResponse>(`/v1/courses/admin/${id}/reject`, {
      feedback,
    });
  },

  softDeleteCourse: async (id: string) => {
    return await defaultApi.delete<ISuccessResponse>(`/v1/courses/admin/${id}`);
  }
};

export default courseService;
