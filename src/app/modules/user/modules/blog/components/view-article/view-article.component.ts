import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {SandboxBlogService} from "../../services/sandbox-blog.service";
import {ArticleI, ArticleTranslatableProp} from "../../models/app.article.model";

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogSandbox: SandboxBlogService,
  ) { }

  unsubscribe$ = new Subject<void>();
  article$: Observable<ArticleI>;
  selectedLanguage = 'en';
  articleBody: string;

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        if (params.id !== undefined) {
          this.article$ =  this.blogSandbox.articleById$(params.id)
            .pipe(
              map((article) => {
                this.articleBody = this.translate(article, 'body', this.selectedLanguage);
                return article;
              })
            );
        }
      });
  }

  translate(article: ArticleI, prop: ArticleTranslatableProp, lang: string): string {
    return this.blogSandbox.translate(article, prop, lang);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
