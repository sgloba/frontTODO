import {Component} from '@angular/core';
import {filter, switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {SandboxBlogService} from "../../services/sandbox-blog.service";
import {ArticleI, ArticleTranslatableProp} from "../../models/app.article.model";

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogSandbox: SandboxBlogService,
  ) {
  }

  selectedLanguage = 'en';
  article$: Observable<ArticleI> = this.activatedRoute.queryParams
    .pipe(
      filter((params) => params.id !== undefined),
      switchMap((params) => this.blogSandbox.articleById$(params.id))
    );

  translate(article: ArticleI, prop: ArticleTranslatableProp, lang: string): string {
    return this.blogSandbox.translate(article, prop, lang);
  }

}
