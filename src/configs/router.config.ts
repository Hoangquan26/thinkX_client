export const routerConfig = {
    homePage: '',
    login: '/login',
    register: '/register',
    terms: '/terms',
    userPolicy: '/policies',
    course: '/courses',
    courseDetail: '/courses/:id',

    
    admin: {
        path: '/admin',
        childrens: {
            courseManager: '/course',

        }

    },
    
    authenticate: {
        course: {
            learning: '/learning',
        },
        user: {
            userProfile: '/me',
            changePassword: '/change-password',
            carts: '/carts',
            checkout: '/checkout'
        }
    }
}