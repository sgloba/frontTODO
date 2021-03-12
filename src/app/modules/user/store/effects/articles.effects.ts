import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {map, catchError, switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {
  fetchArticlesStart,
  fetchArticlesSuccess,
  setMark, setMarkError,
  setMarkStart,
} from "../actions/articles.actions";
import {HttpBlogService} from "../../modules/blog/services/http-blog.service";
import {articleById} from "../selectors/articles.selectors";


@Injectable()
export class ArticlesEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private httpBlog: HttpBlogService,
  ) {
  }

  fetchArticles$ = createEffect(() => this.actions$.pipe(
    ofType(fetchArticlesStart),
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
    ofType(setMarkStart),
    switchMap(({id, mark}) => {
      return of(EMPTY)
        .pipe(
          withLatestFrom(this.store.pipe(select(articleById(id)))),
          map(([, article]) => {
            return [{id, mark}, article];
          }),
        );
    }),
    // @ts-ignore
    switchMap(([{id, mark}, prevArticle]) => {
      this.store.dispatch(setMark({id, mark}));
      return this.httpBlog.setArticleMarks$(id, mark)
        .pipe(
          catchError(() => {
            this.store.dispatch(setMarkError({article: prevArticle}));
            return EMPTY;
          })
        );
      }
    )
  ), { dispatch: false });
}
