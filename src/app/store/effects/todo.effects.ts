import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {map, catchError, concatMap} from 'rxjs/operators';
import { TodoHttpService } from '../../services/todo-http.service';
import {
  fetchTodosStart,
  fetchTodosSuccess,
  addTodoStart,
  addTodoSuccess,
  updateTodoStart,
  updateTodoSuccess,
  removeTodoStart,
  removeTodoSuccess,
  toggleActiveTodoStart,
  toggleActiveTodoSuccess
} from '../actions/todo.actions';


@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoHttpService: TodoHttpService,
  ) {}


  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(fetchTodosStart.type),
    concatMap(() => this.todoHttpService.getTodos()
      .pipe(
        map(todos => fetchTodosSuccess({ todos })),
        catchError((err) => {
          return EMPTY;
        })
      ))
    )
  );

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(addTodoStart.type),
    concatMap(({ value }) => this.todoHttpService.addTodo(value)
      .pipe(
        map((todo) => addTodoSuccess({todo})),
        catchError((err) => {
          return EMPTY;
        })
      )
    ))
  );

  removeTodo$ = createEffect( () => this.actions$.pipe(
    ofType(removeTodoStart.type),
    concatMap(({_id}) => this.todoHttpService.removeTodo(_id)
      .pipe(
        map(() => removeTodoSuccess(_id)),
        catchError((err) => {
          return EMPTY;
        })
      )
    ))
  );

  toggleActive$ = createEffect(() => this.actions$.pipe(
    ofType(toggleActiveTodoStart.type),
    concatMap(({_id}) => this.todoHttpService.toggleActive(_id)
      .pipe(
        map((id) => toggleActiveTodoSuccess(id)),
        catchError((err) => {
          return EMPTY;
        })
      )
    ))
  );

  updateTodo$ = createEffect(() => this.actions$.pipe(
    ofType(updateTodoStart.type),
    concatMap(({_id, value}) => this.todoHttpService.editValue(_id, value)
      .pipe(
        map(() => updateTodoSuccess({_id, value})),
        catchError((err) => {
          return EMPTY;
        })
      )
    ))
  );
}
