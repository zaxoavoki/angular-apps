import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Todo } from '../../types/Todo';

@Injectable()
export class TodosService {
  filtered$: BehaviorSubject<string>;
  todos$: Observable<Todo[]>;

  constructor(private store: AngularFirestore) {
    this.filtered$ = new BehaviorSubject('');
    this.todos$ = this.filtered$.pipe(
      switchMap(
        (order: string) =>
          this.store
            .collection('todos', (ref) =>
              ref.orderBy('text', order as 'desc' | 'asc')
            )
            .valueChanges({ idField: 'id' }) as Observable<Todo[]>
      )
    );
  }

  addTodo(todo: Todo): void {
    this.store.collection('todos').add(todo);
  }

  removeTodo(id: string): void {
    this.store.collection('todos').doc(id).delete();
  }

  async toggleComplete(id: string): Promise<void> {
    const data = await this.store.collection('todos').doc(id).get().toPromise();
    const todo = data.data() as Todo;
    if (!todo) {
      return;
    }
    await data.ref.set({ ...todo, isComplete: !todo.isComplete });
  }
}
