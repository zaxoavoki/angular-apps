import { User } from "./User";

export interface Course {
  _id: string;
  title: string;
  text: string;
  picture: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  participants: User[];
  teacher: User;
}