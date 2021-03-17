import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainBlogPageComponent} from './components/main-blog-page/main-blog-page.component';
import {CreateArticleComponent} from "./components/create-article/create-article.component";
import {ViewArticleComponent} from "./components/view-article/view-article.component";
import {BlogInitComponent} from "./components/blog-init/blog-init.component";

const routes: Routes = [
  {path: '', component: BlogInitComponent, children:
    [
      {path: 'list', component: MainBlogPageComponent},
      {path: 'create', component: CreateArticleComponent},
      {path: 'view', component: ViewArticleComponent},
      {path: '**', redirectTo: 'list'},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
