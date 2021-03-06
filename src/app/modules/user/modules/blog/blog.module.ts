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
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { BlogInitComponent } from './components/blog-init/blog-init.component';
import {FileModule} from "../file/file.module";
import { CommentComponent } from './components/comment/comment.component';


@NgModule({
  declarations: [
    MainBlogPageComponent,
    ArticleCardComponent,
    CreateArticleComponent,
    ViewArticleComponent,
    BlogInitComponent,
    CommentComponent,
  ],
    imports: [
        CKEditorModule,
        CommonModule,
        AppCommonModule,
        BlogRoutingModule,
        UserModule,
        MaterialModule,
        FormsModule,
        FileModule
    ],
})
export class BlogModule {
}
