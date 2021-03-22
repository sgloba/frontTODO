import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, concatMap, filter, map, merge, switchMap, take, tap, withLatestFrom} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {SandboxBlogService} from "../../services/sandbox-blog.service";
import {ArticleI, ArticleTranslatableProp} from "../../models/app.article.model";
import {HttpCommentService} from "../../services/http-comment.service";
import {SandboxCommentService} from "../../services/sandbox-comment.service";
import {CombineLatestOperator} from "rxjs/internal-compatibility";
import {Store} from "@ngrx/store";
import {topLevelCommentsByArticleId} from "../../../../store/selectors/comment.selectors";
import {CommentI} from "../../models/app.comment.model";

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
    private commentSandbox: SandboxCommentService,
    private store: Store
  ) {
  }

  selectedLanguage = 'en';

  page$ = this.commentSandbox.page$.pipe(map((page) => {
    this.page = page;
  }));
  page = 0;
  articleId = '';
  hasNextPage$ = this.commentSandbox.hasNextPage$;

  article$: Observable<ArticleI> = this.activatedRoute.queryParams
    .pipe(
      filter((params) => params.id !== undefined),
      switchMap((params) => {
        this.articleId = params.id;

        this.commentSandbox.fetchComments(params.id, this.page);
        return this.blogSandbox.articleById$(params.id);
      })
    );
  comments$: Observable<CommentI[]> = this.article$.pipe(
    switchMap((article) => {
      return this.store.select(topLevelCommentsByArticleId(article._id));
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
      article_id: articleId,
      parentCommentId: ''
    };
    this.httpCommentService.createComment$(data).subscribe((comment) => {
      this.commentSandbox.onCommentCreated(comment);
      this.commentSandbox.fetchComments(articleId, this.page);
    });
    event.target.reset();
  }

  async showMoreComments(articleId): Promise<any> {
    await this.commentSandbox.addPage();
    this.commentSandbox.fetchComments(articleId, this.page);
  }

  ngOnDestroy(): void {
    this.commentSandbox.clearComments();
  }
}
