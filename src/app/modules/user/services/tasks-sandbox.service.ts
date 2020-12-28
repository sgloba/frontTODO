import {Injectable} from '@angular/core';
import {Store, select} from '@ngrx/store';

import {TodoHttpService} from 'src/app/modules/user/services/todo-http.service';
import {
  addTodoStart,
  fetchTodosStart,
  removeTodoStart, selectTodo,
  toggleActiveTodoStart,
  updateTodoStart,
  addSubtaskStart, removeSubtaskStart, toggleActiveSubtaskStart, selectCategories
} from "../store/actions/todo.actions";
import {
  currentSubtask,
  currentTodo,
  currentTodoId, isTodoSelected,isTodoDisable,
  getFilteredTodos
} from "../store/selectors/todos.selectors";
import {distinctUntilChanged} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TasksSandboxService {

  constructor(
    private http: TodoHttpService,
    private store: Store
  ) {
  }


  getFilteredTodos(status: 'active' | 'completed' | 'all' = 'all', categories: string[] = []) {
    return this.store.pipe(select(getFilteredTodos(status, categories)))
  }


  selectedTodoId$ = this.store.pipe(select(currentTodoId));
  currentTodo$ = this.store.pipe(select(currentTodo));
  currentSubtask$ = this.store.pipe(select(currentSubtask));
  isTodoSelected$ = this.store.pipe(select(isTodoSelected));

  requestTodos(): void {
    this.store.dispatch(fetchTodosStart());
  }

  add(value: string): void {
    this.store.dispatch(addTodoStart({value}));
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

  isTodoDisabled$(id: number) {
    return this.store.pipe(select(isTodoDisable(id))).pipe()
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

  //Category
  selectCategories(categories: string[]) {
    this.store.dispatch(selectCategories({categories}))
  }

}
