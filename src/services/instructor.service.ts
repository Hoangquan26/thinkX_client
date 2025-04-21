import { defaultApi } from "@/api/api";
import { ENDPOINT } from "@/configs/api.config";
import { IInstructorRequest } from "@/interfaces/instructor-request.interface";
import ISuccessResponse, { IPaginatedResponse } from "@/interfaces/ISuccessResponse";

interface GetAllParams {
  page?: number;
  limit?: number;
  status?: string;
  query?: string;
}

const InstructorService = {
  // User APIs
  getMyRequest: async (): Promise<ISuccessResponse> => {
    return await defaultApi.get(ENDPOINT.v1.user.instructor.me);
  },

  createRequest: async (description: string): Promise<ISuccessResponse> => {
    return await defaultApi.post(ENDPOINT.v1.user.instructor.create, { description });
  },

  // Admin APIs
  approve: async (id: string): Promise<ISuccessResponse> => {
    return await defaultApi.patch(ENDPOINT.v1.admin.instructor.getApprovelRequestByParam(id));
  },

  reject: async (id: string): Promise<ISuccessResponse> => {
    return await defaultApi.patch(ENDPOINT.v1.admin.instructor.getRejectRequestByParam(id));
  },

  getAll: async ({
    page = 1,
    limit = 10,
    status = "",
    query = ""
  }: GetAllParams): Promise<IPaginatedResponse<IInstructorRequest>> => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status ? { status } : {}),
      ...(query ? { query } : {})
    });

    return await defaultApi.get(`${ENDPOINT.v1.admin.instructor.getAll}?${queryParams.toString()}`);
  }
};

export default InstructorService;
