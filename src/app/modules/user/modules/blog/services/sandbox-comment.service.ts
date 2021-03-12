import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {clearComments, fetchCommentsStart} from "../../../store/actions/comments.actions";
import {allComments} from "../../../store/selectors/comment.selectors";

@Injectable({
  providedIn: 'root'
})
export class SandboxCommentService {

  constructor(
    private store: Store
  ) {
  }
  comments$ = this.store.select(allComments);

  fetchCommentsByArticleId(articleId): void {
    this.store.dispatch(fetchCommentsStart({articleId}));
  }

  clearComments(): void {
    this.store.dispatch(clearComments());
  }
}
