import { defaultApi } from "@/api/api"; 
import { ENDPOINT } from "@/configs/api.config";
import { ICategory } from "@/interfaces/category.interface";
import { IPaginatedResponse } from "@/interfaces/ISuccessResponse";
import ISuccessResponse from "@/interfaces/ISuccessResponse";

const categoryService = {
  getAllPublic: async (): Promise<ISuccessResponse> => {
    const res = await defaultApi.get(ENDPOINT.v1.category.getPublic) as ISuccessResponse;
    return res; 
  },

  getBySlug: async (slug: string): Promise<ISuccessResponse> => {
    const res = await defaultApi.get(ENDPOINT.v1.category.getBySlug(slug)) as ISuccessResponse
    return res; 
  },

  getAdminPaginated: async (page: number, limit: number, query?: string, status?: string): Promise<IPaginatedResponse<ICategory>> => {
    const url = ENDPOINT.v1.category.admin.paginate(page, limit, query, status);
    const res = await defaultApi.get(url) as IPaginatedResponse<ICategory>;
    return res
  },

  getAdminDetail: async (id: string): Promise<ISuccessResponse> => {
    const res = await defaultApi.get(ENDPOINT.v1.category.admin.getById(id)) as ISuccessResponse;
    return res
  },

  create: async (data: Partial<ICategory>): Promise<ISuccessResponse> => {
    const res = await defaultApi.post(ENDPOINT.v1.category.admin.create, data) as ISuccessResponse;
    return res
  },

  update: async (id: string, data: Partial<ICategory>): Promise<ISuccessResponse> => {
    const res = await defaultApi.patch(ENDPOINT.v1.category.admin.update(id), data) as ISuccessResponse;
    return res; 
  },
};

export default categoryService;
