import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, filter, merge, switchMap, take, tap, withLatestFrom} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {SandboxBlogService} from "../../services/sandbox-blog.service";
import {ArticleI, ArticleTranslatableProp} from "../../models/app.article.model";
import {HttpCommentService} from "../../services/http-comment.service";
import {SandboxCommentService} from "../../services/sandbox-comment.service";
import {CombineLatestOperator} from "rxjs/internal-compatibility";

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
  page$ = this.commentSandbox.page$;
  hasNextPage$ = this.commentSandbox.hasNextPage$;

  article$: Observable<ArticleI> = this.activatedRoute.queryParams
    .pipe(
      filter((params) => params.id !== undefined),
      withLatestFrom(this.page$),
      switchMap(([params, page]) => {
        this.commentSandbox.fetchCommentsByArticleId(params.id, page);
        return this.blogSandbox.articleById$(params.id);
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
    this.httpCommentService.createComment$(data).subscribe((comment) => {
      this.commentSandbox.onCommentCreated(comment);
      this.fetchComments();
    });
    event.target.reset();
  }

  async showMoreComments(): Promise<any> {
    await this.commentSandbox.addPage();
    this.fetchComments();
  }

  fetchComments(): void {
    this.article$.pipe(
      take(1),
      withLatestFrom(this.page$),
      switchMap(([article, page]) => {

        this.commentSandbox.fetchCommentsByArticleId(article._id, page);
        return this.blogSandbox.articleById$(article._id);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.commentSandbox.clearComments();
  }
}
