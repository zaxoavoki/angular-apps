import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: [],
})
export class TodoComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.todoService.todos.subscribe(
      (todos) => (this.todo = todos.find((todo: Todo) => todo.id === id))
    );
  }
}
