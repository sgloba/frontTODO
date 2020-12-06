import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

const routes: Routes = [
  // {path: '', component: TodoItemComponent },
  {path: ':id', component: TodoItemComponent },
  // {path: '2', component: TodoItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
