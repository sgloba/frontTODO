import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainBlogPageComponent} from './components/main-blog-page/main-blog-page.component';

const routes: Routes = [
  {path: '', component: MainBlogPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
