import axios from 'axios'

// Config default api
export const BASE_URL = "http://localhost:3001"
export const TIMEOUT = 10000

export const ENDPOINT = {
    v1: {
        login: '/v1/auth/login',
        register: '/v1/auth/register',
        logout: '/v1/auth/logout',
        refreshToken: '/v1/auth/refreshToken',
        verifyAccount: '/v1/auth/verifyAccount',

        user: {
            instructor: {
                me: '/v1/instructorRequest/me',
                create: '/v1/instructorRequest'
            }
        },

        admin: {
            instructor: {
                aprrovelRequest: '/v1/instructorRequest/{{{:id}}}/approve',
                getApprovelRequestByParam: (id: string) => {
                    return ENDPOINT.v1.admin.instructor.aprrovelRequest.replace('{{{:id}}}', id)
                },
                
                rejectRequest: '/v1/instructorRequest/{{{:id}}}/reject',
                getRejectRequestByParam: (id: string) => {
                    return ENDPOINT.v1.admin.instructor.rejectRequest.replace('{{{:id}}}', id)
                },

                getAll: '/v1/instructorRequest'
            },
            user: {
                allPaginate: '/v1/user',
                allPaginate_query: '?page={{{page}}}&limit={{{limit}}}&role={{{role}}}&query={{{query}}}',
                getAllPaginate: ({page, limit, role, query}: {page: number, limit: number, role: string, query: string}) => {
                    return ENDPOINT.v1.admin.user.allPaginate +
                    ENDPOINT.v1.admin.user.allPaginate_query.replace('{{{page}}}', page.toString())
                    .replace('{{{limit}}}', limit.toString())
                    .replace('{{{role}}}', role)
                    .replace('{{{query}}}', query);
                }
            }
        },

        course: {
            // 📌 Public APIs (no auth)
            public: {
              all: ({ page, limit, query, sortField, sortOrder }: { page?: number; limit?: number; query?: string; sortField?: string; sortOrder?: number}) =>
                `/v1/courses/public?page=${page || 1}&limit=${limit || 10}&query=${(query || "")}&sortField=${sortField || "createdAt"}&sortOrder=${sortOrder || -1}`,
              bySlug: (slug: string) => `/v1/courses/${slug}`,
              byCategory: (slug: string) => `/v1/courses/public-by-category/${slug}`,
              lessons: (courseId: string) => `/v1/lessons/${courseId}/all`,
              learningLessons: (courseId: string) => `/v1/lessons/learning/${courseId}/all`
            },
          
            // 🔒 Instructor APIs
            instructor: {
              myCourses: '/v1/courses/instructor/courses/me',
              create: '/v1/courses',
              update: (id: string) => `/v1/courses/${id}`,
              delete: (id: string) => `/v1/courses/${id}`,
              publish: (id: string) => `/v1/courses/${id}/publish`,
              detailById: (id: string) => `/v1/courses/instructor/${id}`,
              draft: (id: string) => `/v1/courses/draft/${id}`,
            },
          
            // 🔐 Admin APIs
            admin: {
              all: '/v1/courses/admin/all',
              getById: (id: string) => `/v1/courses/admin/${id}`,
              approve: (id: string) => `/v1/courses/admin/${id}/approve`,
              reject: (id: string) => `/v1/courses/admin/${id}/reject`,
              delete: (id: string) => `/v1/courses/admin/${id}`
            }
        },

        category: {
            getPublic: '/v1/categories/public',
            getBySlug: (slug: string) => `/v1/categories/${slug}`,
          
            admin: {
              base: '/v1/categories/admin/all',
              paginate: (page: number, limit: number, query = "", status = "ALL") =>
                `/v1/categories/admin/all?page=${page}&limit=${limit}&query=${encodeURIComponent(query)}&status=${status}`,
              getById: (id: string) => `/v1/categories/admin/${id}`,
              create: '/v1/categories/admin',
              update: (id: string) => `/v1/categories/admin/${id}`,
            }
        },
        lesson: {
            // 👨‍🎓 Public / Authenticated user
            getById: (id: string) => `/v1/lessons/${id}`,
          
            // 🧑‍🏫 Instructor
            instructor: {
              allMyLessons: '/v1/lessons/instructor/all',
              getByCourseId: (courseId: string) => `/v1/lessons/instructor/lessons/course/${courseId}`,
              create: '/v1/lessons/instructor/lessons',
              update: (id: string) => `/v1/lessons/instructor/lessons/${id}`,
              delete: (id: string) => `/v1/lessons/instructor/lessons/${id}`,
            },
          
            // 🛡️ Admin
            admin: {
              getAll: '/v1/lessons/admin/lessons',
              delete: (id: string) => `/v1/lessons/admin/lessons/${id}`,
            }
          }
          

    }
}
