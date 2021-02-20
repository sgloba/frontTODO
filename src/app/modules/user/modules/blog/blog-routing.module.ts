import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainBlogPageComponent} from './components/main-blog-page/main-blog-page.component';
import {CreateArticleComponent} from "./components/create-article/create-article.component";
import {ViewArticleComponent} from "./components/view-article/view-article.component";

const routes: Routes = [
  {path: '', component: MainBlogPageComponent},
  {path: 'create', component: CreateArticleComponent},
  {path: 'view', component: ViewArticleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
