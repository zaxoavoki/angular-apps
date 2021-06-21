import { Component, OnInit } from '@angular/core';
import { TodosService } from './todos.service';
import { Todo } from '../../types/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: [],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  sortBy?: string;

  constructor(private todoService: TodosService) {}

  ngOnInit() {
    this.todoService.todos$.subscribe(
      (todos) => (this.todos = todos as Todo[])
    );
  }

  toggleComplete(id: string) {
    this.todoService.toggleComplete(id);
  }

  sortTodosBy(order: string) {
    this.sortBy = order;
    this.todoService.filtered$.next(order);
  }

  removeTodo(id: string) {
    this.todoService.removeTodo(id);
  }
}
