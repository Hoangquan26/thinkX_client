const UserRole = {
    STUDENT: "student", // 1
    INSTRUCTOR: "instructor", // 2
    ADMIN: "admin", // 4
};

const ApplicationRoles = {
    // Course roles
    ADD_COURSE: 1 << 1, 
    EDIT_COURSE: 1 << 2, 
    DELETE_COURSE: 1 << 3, 
    MANAGE_COURSE: 1 << 4, 

    // User roles
    VIEW_USERS: 1 << 5, 
    EDIT_USERS: 1 << 6, 
    DELETE_USERS: 1 << 7,
    MANAGE_USERS: 1 << 8, 

    // Additional course roles
    VIEW_REPORTS: 1 << 9, 
    MANAGE_PAYMENTS: 1 << 10, 
    ACCESS_ANALYTICS: 1 << 11, 
    MANAGE_DISCOUNTS: 1 << 12, 

    // Admin-specific roles
    MANAGE_ROLES: 1 << 13, // 8192
    VIEW_SYSTEM_LOGS: 1 << 14, // 16384
    MANAGE_SETTINGS: 1 << 15, // 32768
    MANAGE_NOTIFICATIONS: 1 << 16, // 65536
    MANAGE_SUPPORT_TICKETS: 1 << 17, // 131072
};

const UserPermission = {
    [UserRole.STUDENT]: 0,
    [UserRole.INSTRUCTOR]: ApplicationRoles.ADD_COURSE | ApplicationRoles.EDIT_COURSE | ApplicationRoles.DELETE_COURSE 
                            | ApplicationRoles.MANAGE_COURSE | ApplicationRoles.VIEW_REPORTS | ApplicationRoles.ACCESS_ANALYTICS 
                            | ApplicationRoles.MANAGE_DISCOUNTS | ApplicationRoles.MANAGE_PAYMENTS,
    [UserRole.ADMIN]: ApplicationRoles.ADD_COURSE | ApplicationRoles.EDIT_COURSE | ApplicationRoles.DELETE_COURSE 
                      | ApplicationRoles.MANAGE_COURSE | ApplicationRoles.VIEW_USERS | ApplicationRoles.EDIT_USERS 
                      | ApplicationRoles.DELETE_USERS | ApplicationRoles.MANAGE_USERS | ApplicationRoles.VIEW_REPORTS 
                      | ApplicationRoles.MANAGE_PAYMENTS | ApplicationRoles.ACCESS_ANALYTICS | ApplicationRoles.MANAGE_DISCOUNTS 
                      | ApplicationRoles.MANAGE_ROLES | ApplicationRoles.VIEW_SYSTEM_LOGS | ApplicationRoles.MANAGE_SETTINGS 
                      | ApplicationRoles.MANAGE_NOTIFICATIONS | ApplicationRoles.MANAGE_SUPPORT_TICKETS,
};

export {
    UserRole,
    ApplicationRoles,
    UserPermission
}