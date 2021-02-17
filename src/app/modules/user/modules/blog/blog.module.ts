import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainBlogPageComponent} from './components/main-blog-page/main-blog-page.component';
import {BlogRoutingModule} from './blog-routing.module';
import {UserModule} from '../../user.module';
import {AppCommonModule} from '../../../appCommon/appCommon.module';
import {MaterialModule} from "../../../material/material.module";
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import {BlogService} from "./services/blog.service";
import {BlogMockService} from "./services/blog-mock.service";


@NgModule({
  declarations: [
    MainBlogPageComponent,
    ArticleCardComponent,
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    BlogRoutingModule,
    UserModule,
    MaterialModule
  ]
})
export class BlogModule {
}
