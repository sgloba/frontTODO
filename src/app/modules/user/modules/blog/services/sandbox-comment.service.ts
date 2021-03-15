import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {clearComments, fetchCommentsStart} from "../../../store/actions/comments.actions";
import {allComments, hasNextPageSelector, page} from "../../../store/selectors/comment.selectors";

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
  hasNextPage$ = this.store.select(hasNextPageSelector);

  fetchCommentsByArticleId(articleId, currentPage): void {
    this.store.dispatch(fetchCommentsStart({articleId, currentPage}));
  }

  clearComments(): void {
    this.store.dispatch(clearComments());
  }

}
