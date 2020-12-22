import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { TodoHttpService } from 'src/app/services/todo-http.service';
import {
  addTodoStart,
  fetchTodosStart,
  removeTodoStart, selectTodo,
  toggleActiveTodoStart,
  updateTodoStart,
  addSubtaskStart, removeSubtaskStart, toggleActiveSubtaskStart
} from "../store/actions/todo.actions";
import {
  activeTodos,
  allTodos,
  completedTodos, currentSubtask,
  currentTodo,
  currentTodoId, isTodoSelected,
} from "../store/selectors/todos.selectors";




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


  selectedTodoId$ = this.store.pipe(select(currentTodoId));
  currentTodo$ = this.store.pipe(select(currentTodo));
  currentSubtask$ = this.store.pipe(select(currentSubtask));
  isTodoSelected$ = this.store.pipe(select(isTodoSelected));


  requestTodos(): void {
    this.store.dispatch(fetchTodosStart());
  }

  add(value: string): void {
    this.store.dispatch(addTodoStart({ value }));
  }

  remove(id: number): void {
    this.store.dispatch(removeTodoStart({id}))
  }

  toggleActive(id: number): void {
    this.store.dispatch(toggleActiveTodoStart({id}))
  }

  editValue(id: number, value: string): void {
    this.store.dispatch(updateTodoStart({id, value}))
  }

  selectTodo(id: number) {
    this.store.dispatch(selectTodo({id}))
  }

  //Subtask

  addSubtask(value: string, id: number): void {
    this.store.dispatch(addSubtaskStart({value, id}))
  }

  removeSubtask(id: number, subId: number) {
    this.store.dispatch(removeSubtaskStart({id, subId}))
  }

  toggleActiveSubtask(id: number, subId: number) {
    this.store.dispatch(toggleActiveSubtaskStart({id, subId}))
  }

}
