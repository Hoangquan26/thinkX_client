import { LanguageObject } from "../../../../interfaces/language-object.interface"
import { ICourseModel } from "../../../../interfaces/models/course-model.interface"

export interface CourseSectionInterface {
    title: LanguageObject 
    courseItems: ICourseModel[]
}

export const courseConstant: CourseSectionInterface = {
    title: {
        eng: 'Newest Course',
        vn: 'Khóa học mới nhất'
    },
    courseItems: [
        {
            courseName: 'Introduction to Programming',
            courseThumb: 'https://miro.medium.com/v2/resize:fit:1200/1*2xsLeLNqKwIoGOQlw8O6Ug.png',
            courseUrl: '/course/introduction-to-programming',
            coursePrice: 49.99,
            courseLessonCount: 30,
            courseLength: '15 hours',
            courseStudentCount: 1200,
            courseAuthorName: 'John Doe',
            courseCategoryName: 'IT',
            courseRating: 4.5,
            _id: '1',
        },
        {
            courseName: 'Advanced JavaScript',
            courseThumb: 'https://miro.medium.com/v2/resize:fit:1200/1*2xsLeLNqKwIoGOQlw8O6Ug.png',
            courseUrl: '/course/advanced-javascript',
            coursePrice: 59.99,
            courseLessonCount: 25,
            courseLength: '20 hours',
            courseStudentCount: 800,
            courseAuthorName: 'Jane Smith',
            courseCategoryName: 'IT',
            courseRating: 4.7,
            _id: '2'
        },
        {
            courseName: 'Web Development Bootcamp',
            courseThumb: 'https://miro.medium.com/v2/resize:fit:1200/1*2xsLeLNqKwIoGOQlw8O6Ug.png',
            courseUrl: '/course/web-development-bootcamp',
            coursePrice: 99.99,
            courseLessonCount: 50,
            courseLength: '40 hours',
            courseStudentCount: 1500,
            courseAuthorName: 'Alice Johnson',
            courseCategoryName: 'IT',
            courseRating: 4.8,
            _id: '3'
        },
        {
            courseName: 'Data Science with Python',
            courseThumb: 'https://miro.medium.com/v2/resize:fit:1200/1*2xsLeLNqKwIoGOQlw8O6Ug.png',
            courseUrl: '/course/data-science-python',
            coursePrice: 79.99,
            courseLessonCount: 35,
            courseLength: '25 hours',
            courseStudentCount: 900,
            courseAuthorName: 'Bob Brown',
            courseCategoryName: 'IT',
            courseRating: 3.2,
            _id: '4'
        },
        {
            courseName: 'Machine Learning A-Z',
            courseThumb: 'https://miro.medium.com/v2/resize:fit:1200/1*2xsLeLNqKwIoGOQlw8O6Ug.png',
            courseUrl: '/course/machine-learning-az',
            coursePrice: 89.99,
            courseLessonCount: 40,
            courseLength: '30 hours',
            courseStudentCount: 1100,
            courseAuthorName: 'Charlie Davis',
            courseCategoryName: 'IT',
            courseRating: 5,
            _id: '5'
        },
        {
            courseName: 'UI/UX Design Fundamentals',
            courseThumb: 'https://miro.medium.com/v2/resize:fit:1200/1*2xsLeLNqKwIoGOQlw8O6Ug.png',
            courseUrl: '/course/ui-ux-design-fundamentals',
            coursePrice: 69.99,
            courseLessonCount: 20,
            courseLength: '15 hours',
            courseStudentCount: 700,
            courseAuthorName: 'Diana Evans',
            courseCategoryName: 'IT',
            courseRating: 2.8,
            _id: '6'
        }
    ]
}