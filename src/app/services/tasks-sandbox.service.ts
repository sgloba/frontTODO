import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
// import {
//   activeTodos,
//   allTodos,
//   completedTodos,
//   initialEditingValue,
//   isTodoEditing, newEditingValue, selectedTodoId
// } from '../store/selectors/todos.selectors';
//

import { TodoHttpService } from 'src/app/services/todo-http.service';
import {addTodoStart, fetchTodosStart} from "../store/actions/todo.actions";
import {activeTodos, allTodos, completedTodos, selectTodoById} from "../store/selectors/todos.selectors";
import {of} from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class TasksSandboxService {

  constructor(
    private http: TodoHttpService,
    private store: Store
  ) { }

  allTodos$ = this.store.pipe(select(allTodos));
  activeTodos$ = this.store.pipe(select(activeTodos));
  completedTodos$  = this.store.pipe(select(completedTodos));

  isEditing$ = of(false)
  initialEditingValue$ = of('');
  newEditingValue$ = of('');

  selectedTodoId$ = of(null);

  requestTodos(): void {
    this.store.dispatch(fetchTodosStart());
  }


  add(value: string): void {
    // this.store.dispatch(addTodoStart({ value }));
  }

  remove(id: number): void {
  }

  toggleActive(id: number): void {
  }

  editValue(id: number, value: string): void {
  }


  setInitialEditingValue(value): void {
  }
  setNewEditingValue(value: string): void {
  }

  selectTodo(id: number) {
    this.store.pipe(select(selectTodoById, { id: id })).subscribe(res => console.log(res))
  }

  //
  //
  // activeTodos$ = this.store.pipe(select(activeTodos));
  // completedTodos$ = this.store.pipe(select(completedTodos));
  // allTodos$ = this.store.pipe(select(allTodos));
  //
  // isEditing$ = this.store.pipe(select(isTodoEditing));
  // initialEditingValue$ = this.store.pipe(select(initialEditingValue));
  // newEditingValue$ = this.store.pipe(select(newEditingValue));
  //
  // selectedTodoId$ = this.store.pipe(select(selectedTodoId));
  //
  // requestTodos(): void {
  //   this.store.dispatch(fetchTodosStart());
  // }
  //
  //
  // add(value: string): void {
  //   this.store.dispatch(addTodoStart({ value }));
  // }
  //
  // remove(id: number): void {
  //   this.store.dispatch(removeTodo({_id: id}));
  // }
  //
  // toggleActive(id: number): void {
  //   this.store.dispatch(toggleActive({_id: id}));
  // }
  //
  // editValue(id: number, value: string): void {
  //   this.store.dispatch(editValue({_id: id, value}));
  // }
  //
  //
  // setInitialEditingValue(value): void {
  //   this.store.dispatch(setInitialTodoEditingValue({value}));
  // }
  // setNewEditingValue(value: string): void {
  //   this.store.dispatch(setNewTodoEditingValue({value}));
  // }
  //
  // selectTodo(id: number) {
  //   this.store.dispatch(selectTodo({_id: id}))
  // }
}
