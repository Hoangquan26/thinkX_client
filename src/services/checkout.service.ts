import { defaultApi } from "@/api/api";
import ISuccessResponse from "@/interfaces/ISuccessResponse";

const checkoutService = {
  confirmCheckout: async (): Promise<ISuccessResponse> => {
    return await defaultApi.post(`/v1/checkout`);
  },
};

export default checkoutService;
