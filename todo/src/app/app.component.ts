import { Component, Input } from '@angular/core';

export type Todo = {
  text: string;
  isComplete: boolean;
  created_at: Date | null;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  error: string | null = null;
  todo: Todo = {
    text: '',
    created_at: null,
    isComplete: false,
  };

  todos: Todo[] = [];

  addTodo(): void {
    if (this.todo.text.trim() === '') {
      this.error = 'Invalid data';
      return;
    }
    const todo = { ...this.todo };
    todo.created_at = new Date(Date.now());
    this.todos.push(todo);
    this.todo.text = '';
    this.error = null;
  }

  removeTodo(todo: Todo): void {
    this.todos = this.todos.filter(e => e !== todo);
  }

  toggleComplete(todo: Todo): void {
    const idx = this.todos.findIndex((e) => e.text === todo.text);
    if (idx !== -1) {
      this.todos[idx].isComplete = !this.todos[idx].isComplete;
    }
  }
}
