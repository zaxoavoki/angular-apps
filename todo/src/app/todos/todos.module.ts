import { NgModule } from '@angular/core';
import { TodosService } from './todos.service';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { TodosComponent } from './todos.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AddTodoComponent, TodoComponent, TodosComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [TodosService, AuthService],
  exports: [AddTodoComponent, TodoComponent, TodosComponent],
})
export class TodosModule {}
