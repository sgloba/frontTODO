import {createReducer, on} from '@ngrx/store';
import * as ArticlesAction from '../actions/articles.actions';
import {ArticleI} from "../../modules/blog/models/app.article.model";

export interface ArticlesState {
  articles: ArticleI[];
}

export const initialState: ArticlesState = {
  articles: [],
};

export const articleReducer = createReducer(
  initialState,
  on(ArticlesAction.fetchArticlesSuccess,
    (state, {articles}) => {
      return ({...state, articles});
    }
  ),
  on(ArticlesAction.setMarkSuccess,
    ((state,{article}) => {
      const articles = state.articles.map((item) => item._id === article._id ? article : item);
      return {...state, articles};
    })
    )
);
