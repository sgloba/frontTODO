import {createReducer, on} from '@ngrx/store';
import * as ArticlesAction from '../actions/articles.actions';
import {ArticleI} from '../../modules/blog/models/app.article.model';
import {setMarkHelper} from "../utils/store.utils";

export interface ArticlesState {
  articles: ArticleI[];
}

export const initialState: ArticlesState = {
  articles: [],
};

export const articleReducer = createReducer(
  initialState,
  on(ArticlesAction.setMark, (state, {id, mark}) => {
    const newArticle = setMarkHelper(state, id, mark, 'articles');
    return {
      ...state,
      articles: state.articles.map((item) => {
        if (item._id !== id) {
          return item;
        }
        return newArticle;
      })
    };
  }),
  on(ArticlesAction.fetchArticlesSuccess,
    (state, {articles}) => {
      return ({...state, articles});
    }
  ),
  on(ArticlesAction.setMarkError,
    ((state, {article}) => {
      const articles = state.articles.map((item) => item._id === article._id ? article : item);
      return {...state, articles};
    })
  )
);
