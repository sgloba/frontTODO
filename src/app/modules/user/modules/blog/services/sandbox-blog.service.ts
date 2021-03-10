import {Injectable} from '@angular/core';
import {fetchArticlesStart, setMarkStart} from "../../../store/actions/articles.actions";
import {Store} from "@ngrx/store";
import {
  allArticles,
  totalMarks,
  isMarkedByUser, articleById
} from "../../../store/selectors/articles.selectors";
import {Observable} from "rxjs";
import {ArticleI, ArticleTranslatableFieldI, ArticleTranslatableProp} from "../models/app.article.model";

@Injectable({
  providedIn: 'root'
})
export class SandboxBlogService {

  constructor(
    private store: Store
  ) {
  }

  allArticles$ = this.store.select(allArticles);

  articleById$(id): Observable<ArticleI> {
    return this.store.select(articleById(id));
  }

  totalLikes$(articleId): Observable<number> {
    return this.store.select(totalMarks(articleId, 1));
  }

  totalDislikes$(articleId): Observable<number> {
    return this.store.select(totalMarks(articleId, -1));
  }

  isLikedByUser(articleId: string, userId: string): Observable<boolean> {
    return this.store.select(isMarkedByUser(articleId, userId, 1));
  }

  isDislikedByUser(articleId: string, userId: string): Observable<boolean> {
    return this.store.select(isMarkedByUser(articleId, userId, -1));
  }

  fetchAllArticles(): void {
    this.store.dispatch(fetchArticlesStart());
  }

  setArticleMarks(id, mark): void {
    this.store.dispatch(setMarkStart({id, mark}));
  }

  translate(article: ArticleI, prop: ArticleTranslatableProp, lang: string): string {
    const translatedProp = (article[prop] as ArticleTranslatableFieldI[])
      .find((item) => item.lang === lang)
      ?.content;
    if(!translatedProp) {
      return (article[prop] as ArticleTranslatableFieldI[])[0].content;
    } else {
      return translatedProp;
    }
  }
}
