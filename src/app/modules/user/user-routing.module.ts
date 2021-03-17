import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";

const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {path: 'blog', loadChildren: async () => (await import('./modules/blog/blog.module')).BlogModule},
      {path: 'todos', loadChildren: async () => (await import('./modules/todo/todo.module')).TodoModule},
      {path: 'files', loadChildren: async () => (await import('./modules/file/file.module')).FileModule},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
