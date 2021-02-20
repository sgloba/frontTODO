import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainBlogPageComponent} from './components/main-blog-page/main-blog-page.component';
import {CreateArticleComponent} from "./components/create-article/create-article.component";

const routes: Routes = [
  {path: '', component: MainBlogPageComponent},
  {path: 'create', component: CreateArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
