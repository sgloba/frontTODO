import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {map, mergeMap, catchError, concatMap} from 'rxjs/operators';
import { TodoHttpService } from '../../services/todo-http.service';
import {
  addTodo,
  addTodoSuccess, editValue, editValueSuccess,
  fetchTodos,
  fetchTodosSuccess,
  removeTodo,
  removeTodoSuccess, toggleActive, toggleActiveSuccess
} from "../actions/todo.actions";

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoHttpService: TodoHttpService
  ) {}


  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(fetchTodos.type),
    concatMap(() => this.todoHttpService.getTodos()
      .pipe(
        map(todos => fetchTodosSuccess({ todos })),
        catchError((err) => {
          alert(err.message)
          return EMPTY
        })
      ))
    )
  );

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(addTodo.type),
    concatMap(({ value }) => this.todoHttpService.addTodo(value)
      .pipe(
        map((todo) => addTodoSuccess({todo})),
        catchError((err)=> {
          alert(err.message)
          return EMPTY
        })
      )
    ))
  )

  removeTodo$ = createEffect( () => this.actions$.pipe(
    ofType(removeTodo.type),
    concatMap(({_id}) => this.todoHttpService.removeTodo(_id)
      .pipe(
        map((_id) => removeTodoSuccess(_id)),
        catchError((err) => {
          alert(err.message)
          return EMPTY
        })
      )
    ))
  )

  toggleActive$ = createEffect(() => this.actions$.pipe(
    ofType(toggleActive.type),
    concatMap(({_id}) => this.todoHttpService.toggleActive(_id)
      .pipe(
        map((_id) => toggleActiveSuccess(_id)),
        catchError((err) => {
          alert(err.message)
          return EMPTY
        })
      )
    ))
  )

  editValue$ = createEffect(() => this.actions$.pipe(
    ofType(editValue.type),
    concatMap(({_id, value}) => this.todoHttpService.editValue(_id, value)
      .pipe(
        map((_id, value ) => editValueSuccess({_id: _id, value: value})),
        catchError((err) => {
          alert(err.message)
          return EMPTY
        })
      )
    ))
  )
}
