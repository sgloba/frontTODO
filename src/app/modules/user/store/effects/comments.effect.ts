import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {map, catchError, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {
  fetchCommentsStart,
  fetchCommentsSuccess, setCommentsMark, setCommentsMarkStart, setCommentsMarkError,
} from "../actions/comments.actions";
import {HttpCommentService} from "../../modules/blog/services/http-comment.service";
import { commentById} from "../selectors/comment.selectors";


@Injectable()
export class CommentsEffect {

  constructor(
    private actions$: Actions,
    private store: Store,
    private httpComment: HttpCommentService,
  ) {
  }

  fetchComments$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCommentsStart),
    switchMap(({articleId, currentPage}) => this.httpComment.fetchComments$(articleId, currentPage)
      .pipe(
        map(({comments, hasNextPage}) => {
          return fetchCommentsSuccess({comments, hasNextPage});
        }),
        catchError(() => EMPTY)
      )
    )
  ));
  setMark$ = createEffect(() => this.actions$.pipe(
    ofType(setCommentsMarkStart),
    switchMap(({id, mark}) => {
      return of(EMPTY)
        .pipe(
          withLatestFrom(this.store.select(commentById(id))),
          map(([, comment]) => [{id, mark}, comment]),
        );
    }),
    // @ts-ignore
    switchMap(([{id, mark}, prevComment]) => {
        this.store.dispatch(setCommentsMark({id, mark}));
        return this.httpComment.setCommentMarks$(id, mark)
          .pipe(
            catchError(() => {
              this.store.dispatch(setCommentsMarkError({comment: prevComment}));
              return EMPTY;
            })
          );
      }
    )
  ),{dispatch: false});
}
