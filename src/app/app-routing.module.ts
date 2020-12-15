import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListPageComponent} from './components/todo-list/todo-list-page.component';
import {LoginComponent} from "./components/login/login.component";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  {path: 'todos', component: TodoListPageComponent },
  {path: '', component: LoginComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
