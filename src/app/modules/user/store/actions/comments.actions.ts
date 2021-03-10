import {createAction, props} from '@ngrx/store';
import {CommentI} from "../../modules/blog/models/app.comment.model";

export const fetchCommentsStart = createAction(
  '[Comments] Fetch Comments Start',
  props<{ articleId }>()
);
export const fetchCommentsSuccess = createAction(
  '[Comments] Fetch Comments Success',
  props<{ comments: CommentI[] }>()
);
export const setMark =createAction(
  '[Comments] Set Mark',
  props<{ id, mark }>()
);

export const setMarkStart = createAction(
  '[Comments] Set Mark Start',
  props<{ id, mark }>()
);
export const setMarkSuccess = createAction(
  '[Comments] Set Mark Success',
  props<{ comment }>()
);

