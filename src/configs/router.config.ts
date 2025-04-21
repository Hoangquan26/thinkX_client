export const routerConfig = {
  // 👉 Public routes
  homePage: '/',
  login: '/login',
  register: '/register',
  terms: '/terms',
  userPolicy: '/policies',
  verification: '/account/verification',

  course: '/courses',
  courseDetail: '/courses/:slug',
  getcourseDetail: (slug: string) =>`/courses/${slug}`,
  publicCoursesByCategory: '/courses/category/:slug',

  getLoginVerified: (email: string) => `/login?verifiedEmail=${email}`,
  getLoginRegistered: (email: string) => `/login?registeredEmail=${email}`,

  // 👉 Authenticated User routes
  authenticate: {
    user: {
      learning: '/learning/:courseId',
      myLearning: '/my-learning',
      userProfile: '/me',
      changePassword: '/change-password',
      carts: '/carts',
      checkout: '/checkout',
      instructorRequest: '/instructor-request',
      myEnrollments: '/my-learning',
      thanks: '/thanks',
    },
    course: {
      learning: '/learning/:courseId',
    }
  },

  // 👉 Instructor routes
  instructor: '/instructor',
  instructorCourses: '/instructor/courses',
  instructorCourseDetail: (id: string) => `/instructor/courses/${id}/detail`,
  instructorCourseEdit: (id: string) => `/instructor/courses/${id}/edit`,
  instructorLessonManager: (courseId: string) => `/instructor/courses/${courseId}/lessons`,
  instructorLessons: '/instructor/lesson',

  // 👉 Admin routes
  admin: {
    path: '/admin',
    childrens: {
      fullLayout: {
        userManager: '/admin/users',
        instructorRequest: '/admin/instructors',
        courseManager: '/admin/courses',
        categoryManager: '/admin/categories',
        notificationManager: '/admin/notifications',
        courseRequestManager: '/admin/course-requests',
        lessonRequestManager: '/admin/lesson-requests',
      },
      blankLayout: {
        login: '/admin/login'
      }
    }
  }
}
