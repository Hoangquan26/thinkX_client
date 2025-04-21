import { defaultApi } from "@/api/api";
import ISuccessResponse from "@/interfaces/ISuccessResponse";
import { IEnrollment } from "@/interfaces/IEnrollment";

const enrollmentService = {
  enrollInCourse: async (courseId: string): Promise<ISuccessResponse> => {
    return await defaultApi.post(`/v1/enrollments/${courseId}`);
  },

  getMyEnrollments: async (): Promise<ISuccessResponse> => {
    return await defaultApi.get(`/v1/enrollments/my`) as ISuccessResponse;
  },

  getMyEnrolledCourses: async (): Promise<ISuccessResponse> => {
    return await defaultApi.get(`/v1/enrollments/my-courses`) as ISuccessResponse;
  },

  checkEnrolled: async (courseId: string): Promise<ISuccessResponse> => {
    return (await defaultApi.get(`/v1/enrollments/check/${courseId}`)) as ISuccessResponse;
  },

  getStudentsOfCourse: async (courseId: string): Promise<ISuccessResponse> => {
    return await defaultApi.get(`/v1/enrollments/course/${courseId}`) as ISuccessResponse;
  },

  getAllEnrollmentsForAdmin: async (): Promise<ISuccessResponse> => {
    return await defaultApi.get(`/v1/enrollments/admin`) as ISuccessResponse;
  },
};

export default enrollmentService;
