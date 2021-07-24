import { Course } from './Course';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  createdAt: Date;
  picture: string;
  roles: string[];
  courses: Course[];
}
