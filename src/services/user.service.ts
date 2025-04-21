import { defaultApi } from "@/api/api"
import { ENDPOINT } from "@/configs/api.config"
import {IPaginatedResponse} from "@/interfaces/ISuccessResponse"
import { IUser } from "@/interfaces/user.interface"

const userService = {
    getUsers: async ({page = 1,limit = 10,query = "",role = ""}: {page: number,limit: number,role?: string,query?: string}): 
    Promise<IPaginatedResponse<IUser>> => {
        return await defaultApi.get(ENDPOINT.v1.admin.user.getAllPaginate({ page, limit, role, query }));
    }
        
}

export default userService