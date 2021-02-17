import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ArticlesState} from "../reducers/articles.reducer";

const articlesState = createFeatureSelector<ArticlesState>('articles');

export const allArticles = createSelector(
  articlesState,
  ({articles}) => {
    return articles;
  }
);
// export const searchFiles = (searchQuery: string) => createSelector(
//   allArticles,
//   (articles) => articles.filter((article) => article.author.includes(searchQuery)
//   )
// );
