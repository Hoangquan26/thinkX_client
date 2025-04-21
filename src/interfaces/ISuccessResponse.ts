export default interface ISuccessResponse {
    status: number,
    metadata: any,
    options: object,
    message: string
}

export interface IPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IPaginatedResponse<T> {
    status: number;
    metadata: {
        data: T[],
        pagination: IPagination;  
    };         
    message: string;
    options?: object;         
}
