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
  '[Comments] Set Mark',
  props<{ id, mark }>()
);

export const setCommentsMarkStart = createAction(
  '[Comments] Set Mark Start',
  props<{ id, mark }>()
);
export const setCommentsMarkError = createAction(
  '[Comments] Set Mark Error',
  props<{ comment }>()
);
export const clearComments = createAction(
  '[Comments] Clear Comments'
);



