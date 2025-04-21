// services/cart.service.ts
import { defaultApi } from "@/api/api";
import ISuccessResponse from "@/interfaces/ISuccessResponse";
import { ICourse } from "@/interfaces/course.interface";

export const cartService = {
  // Lấy giỏ hàng hiện tại
  getMyCart: async (): Promise<ISuccessResponse> => {
    return await defaultApi.get("/v1/carts") as ISuccessResponse;
  },

  // Lấy thông tin tổng quát giỏ hàng
  getCartAmount: async (): Promise<ISuccessResponse> => {
    return (await defaultApi.get("/v1/carts/amount"));
  },

  // Thêm 1 khóa học vào giỏ hàng
  addToCart: async (courseId: string): Promise<ISuccessResponse> => {
    return await defaultApi.post("/v1/carts/addToCart", { courseId });
  },

  // Cập nhật toàn bộ giỏ hàng (thay đổi danh sách courseIds)
  updateCart: async (courseIds: string[]): Promise<ISuccessResponse> => {
    return await defaultApi.post("/v1/carts", { courseIds });
  },

  // Xóa 1 khóa học khỏi giỏ hàng
  removeFromCart: async (courseId: string): Promise<ISuccessResponse> => {
    return await defaultApi.delete(`/v1/carts/${courseId}`);
  },
};
