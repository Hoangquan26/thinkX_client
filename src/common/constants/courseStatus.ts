export const CourseStatus = {
    DRAFT: "DRAFT",
    PENDING: "PENDING",
    PUBLISHED: "PUBLISHED",
    REJECTED: "REJECTED",
    DELETED: "DELETED"
};

export type CourseStatus = typeof CourseStatus[keyof typeof CourseStatus];