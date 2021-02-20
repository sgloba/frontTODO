import {createAction, props} from '@ngrx/store';
import {ArticleI} from "../../modules/blog/models/app.article.model";

export const fetchArticlesStart = createAction(
  '[Articles] Fetch Articles Start',
);
export const fetchArticlesSuccess = createAction(
  '[Articles] Fetch Articles Success',
  props<{ articles: ArticleI[] }>()
);
export const setMark =createAction(
  '[Articles] Set Mark',
  props<{ id, mark }>()
);

export const setMarkStart = createAction(
  '[Articles] Set Mark Start',
  props<{ id, mark }>()
);
export const setMarkSuccess = createAction(
  '[Articles] Set Mark Success',
  props<{ article }>()
);

