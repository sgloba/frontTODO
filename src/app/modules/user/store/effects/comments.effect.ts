import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {map, catchError, switchMap, withLatestFrom, concatMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {
  fetchCommentsStart,
  fetchCommentsSuccess,
  setCommentsMark,
  setCommentsMarkStart,
  setCommentsMarkError,
  createComment,
  onCommentCreated, fetchOneCommentByIdStart,
} from '../actions/comments.actions';
import {HttpCommentService} from '../../modules/blog/services/http-comment.service';
import {commentById} from '../selectors/comment.selectors';


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
    switchMap(({
                 articleId,
                 currentPage,
                 parentCommentId
               }) => this.httpComment.fetchComments$(articleId, currentPage, parentCommentId)
      .pipe(
        map(({comments, hasNextPage}) => {
          return fetchCommentsSuccess({comments, hasNextPage});
        }),
        catchError(() => EMPTY)
      )
    )
  ));
  fetchOneCommentById$ = createEffect(() => this.actions$.pipe(
    ofType(fetchOneCommentByIdStart),
    switchMap(({commentId}) => this.httpComment.fetchOneCommentById$(commentId)
        .pipe(
          map(({comments, hasNextPage}) => {
            return fetchCommentsSuccess({comments, hasNextPage});
          }),
          catchError(() => EMPTY)
        )
    )
  ));
  createComment$ = createEffect(() => this.actions$.pipe(
    ofType(createComment),
    switchMap(({value, article_id, parentCommentId}) => {
      return this.httpComment.createComment$({value, article_id, parentCommentId})
        .pipe(
          tap((comment) => {
            this.store.dispatch(onCommentCreated({comment}));
          }),
          map(() => {
            return fetchOneCommentByIdStart({commentId: parentCommentId});
          })
        );
    })
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
  ), {dispatch: false});
}
