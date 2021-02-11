import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoListPageComponent} from "./components/todo-list/todo-list-page.component";

const routes: Routes = [
  {
    path: '', component: TodoListPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
