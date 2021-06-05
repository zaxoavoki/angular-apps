import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: [],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos.subscribe((todos) => (this.todos = todos));
  }

  toggleComplete(id: string) {
    this.todoService.toggleComplete(id);
  }

  removeTodo(id: string) {
    this.todoService.removeTodo(id);
  }
}
