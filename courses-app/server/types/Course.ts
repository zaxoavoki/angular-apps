import { User } from "./User";

export interface Course {
  id: string;
  title: string;
  text: string;
  picture: string;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  participants: User[];
  teacher: User;
}