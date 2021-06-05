import { Component } from '@angular/core';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: [],
})
export class AddTodoComponent {
  error: string = '';
  todo: Partial<Todo> = {
    text: '',
  };

  constructor(private todoService: TodoService) {}

  addTodo() {
    if (this.todo.text?.trim() === '') {
      this.error = 'Invalid data';
      return;
    }
    this.todoService.addTodo({
      ...this.todo,
      id: String(Math.random()).slice(2, 8),
      isComplete: false,
      createdAt: new Date(),
    } as Todo);
    this.error = '';
    this.todo.text = '';
  }
}
