import {Injectable} from '@angular/core';
import {fetchArticlesStart, setMarkStart} from "../../../store/actions/articles.actions";
import {Store} from "@ngrx/store";
import {
  allArticles,
  totalMarks,
  isMarkedByUser
} from "../../../store/selectors/articles.selectors";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SandboxBlogService {

  constructor(
    private store: Store
  ) { }

  allArticles$ = this.store.select(allArticles);

  totalLikes$(articleId): Observable<any> {
    return this.store.select(totalMarks(articleId, 1));
  }

  totalDislikes$(articleId): Observable<any> {
    return this.store.select(totalMarks(articleId, -1));
  }

  isLikedByUser(articleId: string, userId: string): Observable<any> {
    return this.store.select(isMarkedByUser(articleId, userId, 1));
  }

  isDislikedByUser(articleId: string, userId: string): Observable<any> {
    return this.store.select(isMarkedByUser(articleId, userId, -1));
  }

  fetchAllArticles(): void {
    this.store.dispatch(fetchArticlesStart());
  }

  setArticleMarks(id, mark): void {
    this.store.dispatch(setMarkStart({id, mark}));
  }
}
