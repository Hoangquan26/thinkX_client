export interface IInstructorRequest {
    status: "PENDING" | "APPROVED" | "REJECTED",
    description: string,
    feedback?: string,
    createdAt: Date
}