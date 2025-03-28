import { ICourseModel } from "@/interfaces/models/course-model.interface"

interface IFilter {
    name: string, 
    value: { name: string, value: string }[]
}

export const CourseFilter: IFilter[] = [
    {
        name: 'Price',
        value: [
            {
                name: 'Paid',
                value: 'Paid'
            },
            {
                name: 'Free',
                value: 'Free'
            }
        ]
    },
    {
        name: 'Level',
        value: [
            {
                name: 'All level',
                value: 'all'
            },
            {
                name: 'Beginner',
                value: 'beginner'
            },
            {
                name: 'Intermediate',
                value: 'intermediate'
            },
            {
                name: 'Expert',
                value: 'expert'
            }
        ]
    },
    {
        name: 'Topic',
        value: [
            {
                name: 'Web development',
                value: 'web-development'
            },
            {
                name: 'Robotic',
                value: 'robotic'
            },
            {
                name: 'Game maker',
                value: 'game-maker'
            },
            {
                name: 'Scratch',
                value: 'scratch'
            }
        ]
    },
]

export const AllCourses: ICourseModel[] = [
    {
        _id: "1",
        courseName: "Introduction to Web Development",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/web-development",
        coursePrice: 49.99,
        courseLessonCount: 20,
        courseLength: "10 hours",
        courseStudentCount: 1200,
        courseAuthorName: "John Doe",
        courseCategoryName: "Web development",
        courseRating: 4.5,
        courseSlug: 'khoa-hoc-lap-trinh'
    },
    {
        _id: "2",
        courseName: "Advanced JavaScript",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/advanced-javascript",
        coursePrice: 59.99,
        courseLessonCount: 25,
        courseLength: "15 hours",
        courseStudentCount: 800,
        courseAuthorName: "Jane Smith",
        courseCategoryName: "Web development",
        courseRating: 4.7,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
    {
        _id: "3",
        courseName: "Game Development with Unity",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/game-development",
        coursePrice: 79.99,
        courseLessonCount: 30,
        courseLength: "20 hours",
        courseStudentCount: 1000,
        courseAuthorName: "Alice Johnson",
        courseCategoryName: "Game maker",
        courseRating: 4.8,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
    {
        _id: "4",
        courseName: "Robotics for Beginners",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/robotics",
        coursePrice: 39.99,
        courseLessonCount: 15,
        courseLength: "8 hours",
        courseStudentCount: 600,
        courseAuthorName: "Bob Brown",
        courseCategoryName: "Robotic",
        courseRating: 4.3,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
    {
        _id: "5",
        courseName: "Scratch Programming for K_ids",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/scratch-programming",
        coursePrice: 29.99,
        courseLessonCount: 10,
        courseLength: "5 hours",
        courseStudentCount: 500,
        courseAuthorName: "Charlie Davis",
        courseCategoryName: "Scratch",
        courseRating: 4.6,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
    {
        _id: "6",
        courseName: "Full-Stack Development Bootcamp",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/full-stack-development",
        coursePrice: 99.99,
        courseLessonCount: 50,
        courseLength: "40 hours",
        courseStudentCount: 1500,
        courseAuthorName: "Diana Evans",
        courseCategoryName: "Web development",
        courseRating: 4.9,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
    {
        _id: "7",
        courseName: "Python for Data Science",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/python-data-science",
        coursePrice: 69.99,
        courseLessonCount: 35,
        courseLength: "25 hours",
        courseStudentCount: 1100,
        courseAuthorName: "Ethan Green",
        courseCategoryName: "Data Science",
        courseRating: 4.7,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
    {
        _id: "8",
        courseName: "Machine Learning A-Z",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/machine-learning",
        coursePrice: 89.99,
        courseLessonCount: 40,
        courseLength: "30 hours",
        courseStudentCount: 1300,
        courseAuthorName: "Fiona Harris",
        courseCategoryName: "Data Science",
        courseRating: 4.8,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
    {
        _id: "9",
        courseName: "UI/UX Design Fundamentals",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/ui-ux-design",
        coursePrice: 49.99,
        courseLessonCount: 20,
        courseLength: "12 hours",
        courseStudentCount: 700,
        courseAuthorName: "George King",
        courseCategoryName: "Design",
        courseRating: 4.5,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
    {
        _id: "10",
        courseName: "Cybersecurity Essentials",
        courseThumb: "https://th.bing.com/th/id/OIP.b0iJUm74QbZ_gHJWf4SCPwAAAA?rs=1&pid=ImgDetMain",
        courseUrl: "/course/cybersecurity",
        coursePrice: 59.99,
        courseLessonCount: 25,
        courseLength: "15 hours",
        courseStudentCount: 900,
        courseAuthorName: "Hannah Lee",
        courseCategoryName: "Cybersecurity",
        courseRating: 4.6,
        courseSlug: 'khoa-hoc-lap-trinh'

    },
]
