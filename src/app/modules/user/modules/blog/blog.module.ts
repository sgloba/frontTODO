import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainBlogPageComponent} from './components/main-blog-page/main-blog-page.component';
import {ArticleComponent} from './components/article/article.component';
import {BlogRoutingModule} from './blog-routing.module';
import {UserModule} from '../../user.module';
import {AppCommonModule} from '../../../appCommon/appCommon.module';


@NgModule({
  declarations: [
    MainBlogPageComponent,
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    BlogRoutingModule,
    UserModule
  ]
})
export class BlogModule {
}
