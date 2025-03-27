export interface ICourseModel{
    courseName: string,
    courseThumb?: string ,
    courseUrl ?: string,
    coursePrice: number,
    courseLessonCount: number,
    courseLength: string,
    courseStudentCount: number,
    courseAuthorName: string,
    courseCategoryName: string,
    courseRating: number,
    _id: string,
    courseSlug?: string,
}