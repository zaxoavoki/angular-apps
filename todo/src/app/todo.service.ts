import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export type Todo = {
  id: string;
  text: string;
  isComplete: boolean;
  createdAt: firebase.firestore.Timestamp & Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = this.store.collection('todos').valueChanges({ idField: 'id' }) as Observable<Todo[]>;

  constructor(private store: AngularFirestore) {}

  addTodo(todo: Todo): void {
    this.store.collection('todos').add(todo);
  }

  removeTodo(id: string): void {
    this.store.collection('todos').doc(id).delete();
  }

  toggleComplete(id: string): void {
    this.store.collection('todos').doc(id).get().subscribe(doc => {
      console.log(doc)
      const todo = doc.data() as Todo;
      doc.ref.set({ ...todo, isComplete: !todo.isComplete })
    }).unsubscribe();
  }
}
