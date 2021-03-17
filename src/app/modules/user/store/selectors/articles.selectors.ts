import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ArticlesState} from "../reducers/articles.reducer";

const articlesState = createFeatureSelector<ArticlesState>('articles');

export const allArticles = createSelector(
  articlesState,
  ({articles}) => {
    return articles;
  }
);

export const articleById = (id: string) => createSelector(
  allArticles,
  (articles) => articles.find((article) => article._id === id)
);

export const totalMarks = (articleId: string, rate: 1 | -1) => createSelector(
  articleById(articleId),
  (article) => {
    return article.marks.filter((mark) => mark.rate === rate).length;
  }
);

