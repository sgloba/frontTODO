import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {map, catchError, concatMap, tap, mergeMap} from 'rxjs/operators';
import {TodoHttpService} from '../../services/todo-http.service';
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
  toggleActiveTodoSuccess,
  addSubtaskStart,
  addSubtaskSuccess,
  removeSubtaskStart,
  removeSubtaskSuccess,
  toggleActiveSubtaskStart, toggleActiveSubtaskSuccess, disableTodo, enableTodo,

} from '../actions/todo.actions';
import {Store} from '@ngrx/store';


@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoHttpService: TodoHttpService,
    private store: Store
  ) {
  }


  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(fetchTodosStart.type),
    concatMap(() => this.todoHttpService.getTodos()
      .pipe(
        map(todos => fetchTodosSuccess({todos})),
        catchError(() => {
          return EMPTY;
        })
      ))
    )
  );

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(addTodoStart.type),
    concatMap(({value}) => this.todoHttpService.addTodo(value)
      .pipe(
        map((todo) => addTodoSuccess({todo})),
        catchError(() => {
          return EMPTY;
        })
      )
    ))
  );

  removeTodo$ = createEffect(() => this.actions$.pipe(
    ofType(removeTodoStart.type),
    concatMap(({id}) => this.todoHttpService.removeTodo(id)
      .pipe(
        map(() => removeTodoSuccess({id})),
        catchError(() => EMPTY)
      )
    ))
  );

  toggleActive$ = createEffect(() => this.actions$.pipe(
    ofType(toggleActiveTodoStart.type),
    tap(({id}) => this.store.dispatch(disableTodo({id})) ),
    mergeMap(({id}) => this.todoHttpService.toggleActive(id)
      .pipe(
        map(() => toggleActiveTodoSuccess({id})),
        catchError((err) => {
          this.store.dispatch(enableTodo({id}));
          return EMPTY;
        })
      )
    ),
    tap(({id}) => this.store.dispatch(enableTodo({id}))
    ),
    )
  );
//
  updateTodo$ = createEffect(() => this.actions$.pipe(
    ofType(updateTodoStart.type),
    tap(({id}) => this.store.dispatch(disableTodo({id})) ),
    concatMap(({id, value}) => this.todoHttpService.editValue(id, value)
      .pipe(
        map(() => updateTodoSuccess({id, value})),
        catchError(() => {
          this.store.dispatch(enableTodo({id}));
          return EMPTY;
        })
      )
    ),
    tap(({id}) => this.store.dispatch(enableTodo({id}))
    ),
    )
  );

  // Subtask

  addSubtask$ = createEffect(() => this.actions$.pipe(
    ofType(addSubtaskStart.type),
    concatMap(({value, id}) => this.todoHttpService.addSubtask(value, id)
      .pipe(
        map((todo) => {
          const subTasks = todo.subTasks;
          return addSubtaskSuccess({id, subTasks});
        }),
        catchError(() => {
          return EMPTY;
        })
      )
    ))
  );

  removeSubtask$ = createEffect(() => this.actions$.pipe(
    ofType(removeSubtaskStart.type),
    concatMap(({id, subId}) => this.todoHttpService.removeSubtask(id, subId)
      .pipe(
        map((todo) => {
          const subTasks = todo.subTasks;
          return removeSubtaskSuccess({id, subTasks});
        }),
        catchError(() => EMPTY)
      )
    ))
  );

  toggleActiveSubtask$ = createEffect(() => this.actions$.pipe(
    ofType(toggleActiveSubtaskStart.type),
    concatMap(({id, subId}) => this.todoHttpService.toggleActiveSubtask(id, subId)
      .pipe(
        map((todo) => {
          const subTasks = todo.subTasks;
          return toggleActiveSubtaskSuccess({id, subTasks});
        }),
        catchError(() => EMPTY)
      )
    ))
  );

}
