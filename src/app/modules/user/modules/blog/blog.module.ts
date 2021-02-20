import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainBlogPageComponent} from './components/main-blog-page/main-blog-page.component';
import {BlogRoutingModule} from './blog-routing.module';
import {UserModule} from '../../user.module';
import {AppCommonModule} from '../../../appCommon/appCommon.module';
import {MaterialModule} from "../../../material/material.module";
import {ArticleCardComponent} from "./components/article-card/article-card.component";
import { CreateArticleComponent } from './components/create-article/create-article.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MainBlogPageComponent,
    ArticleCardComponent,
    CreateArticleComponent,
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    AppCommonModule,
    BlogRoutingModule,
    UserModule,
    MaterialModule,
    FormsModule
  ],
})
export class BlogModule {
}
