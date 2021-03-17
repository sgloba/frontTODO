import {createAction, props} from '@ngrx/store';
import {CommentI} from "../../modules/blog/models/app.comment.model";

export const fetchCommentsStart = createAction(
  '[Comments] Fetch Comments Start',
  props<{ articleId, currentPage }>()
);
export const fetchCommentsSuccess = createAction(
  '[Comments] Fetch Comments Success',
  props<{ comments: CommentI[], hasNextPage: boolean }>()
);
export const setCommentsMark =createAction(
  '[Comments] Set Comments Mark',
  props<{ id, mark }>()
);

export const setCommentsMarkStart = createAction(
  '[Comments] Set Comments Mark Start',
  props<{ id, mark }>()
);
export const setCommentsMarkError = createAction(
  '[Comments] Set Comments Mark  Error',
  props<{ comment }>()
);
export const clearComments = createAction(
  '[Comments] Clear Comments'
);
export const addCommentPage = createAction(
  '[Comments] Add Comment Page'
);

export const onCommentCreated = createAction(
  '[Comments] On Comment Created',
  props<{ comment }>()
);


