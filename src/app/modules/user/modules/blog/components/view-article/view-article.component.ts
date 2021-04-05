import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {filter, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs';
import {SandboxBlogService} from '../../services/sandbox-blog.service';
import {ArticleI, ArticleTranslatableProp} from '../../models/app.article.model';
import {HttpCommentService} from '../../services/http-comment.service';
import {SandboxCommentService} from '../../services/sandbox-comment.service';
import {Store} from '@ngrx/store';
import {topLevelCommentsByArticleId} from '../../../../store/selectors/comment.selectors';
import {CommentI} from '../../models/app.comment.model';

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

  page$ = this.commentSandbox.page$;
  hasNextPageArticle$ = this.commentSandbox.hasNextPageArticle$;

  article$: Observable<ArticleI> = this.activatedRoute.queryParams
    .pipe(
      filter((params) => params.id !== undefined),
      withLatestFrom(this.page$),
      switchMap(([params, page]) => {
        this.commentSandbox.fetchComments(params.id, page);
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
    this.httpCommentService.createComment$(data)
      .pipe(withLatestFrom(this.page$))
      .subscribe(([comment, page]) => {
      this.commentSandbox.onCommentCreated(comment);
      this.commentSandbox.fetchComments(articleId, page);
    });
    event.target.reset();
  }

  showMoreComments(articleId): void {
    this.commentSandbox.addPage();

    this.page$
      .pipe(take(1))
      .subscribe((page) => {
        this.commentSandbox.fetchComments(articleId, page);
      });
  }

  ngOnDestroy(): void {
    this.commentSandbox.clearComments();
  }
}
