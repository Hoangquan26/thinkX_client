export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN"
export type UserStatus = "ACTIVE" | "INACTIVE"

export interface IUser {
  _id: string
  username: string
  email: string
  role: UserRole
  courses_enrolled: string[]
  status: UserStatus
  isActive: boolean
  createdAt?: string
}
