import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListPageComponent} from './components/todo-list/todo-list-page.component';
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: 'todos', component: TodoListPageComponent },
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
