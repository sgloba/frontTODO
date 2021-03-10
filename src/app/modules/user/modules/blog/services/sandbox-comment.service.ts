import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {fetchCommentsStart} from "../../../store/actions/comments.actions";
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
    console.log('serv', articleId)
    this.store.dispatch(fetchCommentsStart({articleId: '604740bb7b80fe2c4c388812'}));
  }
}
