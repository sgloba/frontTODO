import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {fetchArticlesStart, fetchArticlesSuccess, setMarkStart, setMarkSuccess} from "../actions/articles.actions";
import {HttpBlogService} from "../../modules/blog/services/http-blog.service";


@Injectable()
export class ArticlesEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private httpBlog: HttpBlogService,
  ) {
  }

  fetchArticles$ = createEffect(() => this.actions$.pipe(
    ofType(fetchArticlesStart.type),
    switchMap(() => this.httpBlog.fetchArticles$()
      .pipe(
        map((articles) => {
          return fetchArticlesSuccess({articles});
        }),
        catchError(() => EMPTY)
      )
    )
  ));

  setMark$ = createEffect(() => this.actions$.pipe(
    ofType(setMarkStart.type),
    switchMap(({id, mark}) => this.httpBlog.setArticleMarks$(id, mark)
      .pipe(
        map((article) => {
          return setMarkSuccess({article});
        })
      )
    )
    )
  );
}
