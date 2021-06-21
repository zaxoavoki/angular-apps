import firebase from 'firebase';

export type Todo = {
  id: string;
  text: string;
  isComplete: boolean;
  createdAt: firebase.firestore.Timestamp & Date;
};