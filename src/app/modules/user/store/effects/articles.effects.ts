import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, catchError, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {BlogService} from "../../modules/blog/services/blog.service";
import {fetchArticlesStart, fetchArticlesSuccess, setMarkStart, setMarkSuccess} from "../actions/articles.actions";


@Injectable()
export class ArticlesEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private blogService: BlogService,
  ) {
  }

  fetchArtcles$ = createEffect(() => this.actions$.pipe(
    ofType(fetchArticlesStart.type),
    switchMap(() => this.blogService.fetchArticles$()
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
    switchMap(({id, mark}) => this.blogService.HTTPsetArticleMarks$(id, mark)
      .pipe(
        map((article) => {
          return setMarkSuccess({article});
        })
      )
    )
    )
  );
}
