import { IUser } from "./user.interface";
import { ICourse } from "./course.interface";

export interface IEnrollment {
  _id: string;
  user: IUser;
  course: ICourse;
  enrolledAt: string;
  createdAt?: string;
  updatedAt?: string;
}