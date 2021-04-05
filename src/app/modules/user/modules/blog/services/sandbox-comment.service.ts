import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  addCommentPage,
  clearComments,
  fetchCommentsStart,
  onCommentCreated,
  toggleShowReply,
  createComment
} from '../../../store/actions/comments.actions';
import {
  allComments,
  commentsByParentCommentId,
  hasNextPageArticleSelector,
  hasNextPageCommentSelector,
  pageInCommentById,
  page,
  showReplySelector
} from '../../../store/selectors/comment.selectors';
import {Observable} from 'rxjs';
import {CommentI} from '../models/app.comment.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SandboxCommentService {

  constructor(
    private store: Store
  ) {
  }

  comments$ = this.store.select(allComments);
  page$ = this.store.select(page);
  hasNextPageArticle$ = this.store.select(hasNextPageArticleSelector);
  showReplyCommentIds$ = this.store.select(showReplySelector);

  showReplies$(id: string): Observable<boolean> {
    return this.showReplyCommentIds$
      .pipe(
        map((ids) => ids.includes(id))
      );
  }

  hasNextPageComment$(commentId): Observable<boolean> {
    return this.store.select(hasNextPageCommentSelector(commentId));
  }

  pageInCommentById$(commentId): Observable<number> {
    return this.store.select(pageInCommentById(commentId));
  }

  commentsByParentCommentId$(id): Observable<CommentI[]> {
    return this.store.select(commentsByParentCommentId(id));
  }

  fetchComments(articleId, currentPage, parentCommentId = ''): void {
    this.store.dispatch(fetchCommentsStart({articleId, currentPage, parentCommentId}));
  }

  createComment(data): void {
    this.store.dispatch(createComment(data));
  }

  clearComments(): void {
    this.store.dispatch(clearComments());
  }

  addPage(id: string = ''): void {
    return this.store.dispatch(addCommentPage({id}));
  }

  onCommentCreated(comment): void {
    this.store.dispatch(onCommentCreated({comment}));
  }

  toggleShowReply(commentId): void {
    this.store.dispatch(toggleShowReply({commentId}));
  }
}
