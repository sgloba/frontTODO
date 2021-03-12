import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {filter, switchMap, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {SandboxBlogService} from "../../services/sandbox-blog.service";
import {ArticleI, ArticleTranslatableProp} from "../../models/app.article.model";
import {HttpCommentService} from "../../services/http-comment.service";
import {SandboxCommentService} from "../../services/sandbox-comment.service";

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ViewArticleComponent implements OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogSandbox: SandboxBlogService,
    private httpCommentService: HttpCommentService,
    private commentSandbox: SandboxCommentService
  ) {
  }

  selectedLanguage = 'en';

  comments$ = this.commentSandbox.comments$;

  article$: Observable<ArticleI> = this.activatedRoute.queryParams
    .pipe(
      filter((params) => params.id !== undefined),
      switchMap((params) => {
        this.commentSandbox.fetchCommentsByArticleId(params.id);
        return  this.blogSandbox.articleById$(params.id);
      })
    );

  translate(article: ArticleI, prop: ArticleTranslatableProp, lang: string): string {
    return this.blogSandbox.translate(article, prop, lang);
  }

  createComment(articleId, value, event): void {
    if (!value.trim()) {
      return;
    }
    const data = {
      value,
      article_id: articleId
    };
    this.httpCommentService.createComment$(data).subscribe(() => {
      this.commentSandbox.fetchCommentsByArticleId(articleId);
    });
    event.target.reset();
  }

  ngOnDestroy(): void {
    this.commentSandbox.clearComments();
  }
}
