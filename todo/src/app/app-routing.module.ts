import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todo/:id', component: TodoComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
