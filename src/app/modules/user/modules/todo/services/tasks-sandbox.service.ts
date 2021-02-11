import {Injectable} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {TodoHttpService} from 'src/app/modules/user/modules/todo/services/todo-http.service';
import {
  addTodoStart,
  fetchTodosStart,
  removeTodoStart, selectTodo,
  toggleActiveTodoStart,
  updateTodoStart,
  addSubtaskStart,
  removeSubtaskStart,
  toggleActiveSubtaskStart,
  selectCategories
} from '../../../store/actions/todo.actions';
import {
  currentSubtask,
  currentTodo,
  currentTodoId,
  isTodoSelected,
  isTodoDisable,
  getFilteredTodos
} from '../../../store/selectors/todos.selectors';
import {Observable} from 'rxjs';
import {TodoI} from '../../../models/app.todo.model';
import {FilesState} from '../../../store/reducers/files.reducer';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import {isEqual} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TasksSandboxService {

  constructor(
    private http: TodoHttpService,
    private store: Store<FilesState>
  ) {
  }

  selectedTodoId$ = this.store.pipe(select(currentTodoId));
  currentTodo$ = this.store.pipe(select(currentTodo));
  currentSubtask$ = this.store.pipe(select(currentSubtask));
  isTodoSelected$ = this.store.pipe(select(isTodoSelected));


  getFilteredTodos$(status: 'active' | 'completed' | 'all' = 'all', categories: string[] = []): Observable<TodoI[]> {
    return this.store.pipe(
      select(getFilteredTodos(status, categories)),
      distinctUntilChanged((prev, curr) => isEqual(prev, curr))
    );
  }

  requestTodos(): void {
    this.store.dispatch(fetchTodosStart());
  }

  add(value: string): void {
    this.store.dispatch(addTodoStart({value}));
  }

  remove(id: number): void {
    this.store.dispatch(removeTodoStart({id}));
  }

  toggleActive(id: number): void {
    this.store.dispatch(toggleActiveTodoStart({id}));
  }

  editValue(id: number, value: string): void {
    this.store.dispatch(updateTodoStart({id, value}));
  }

  selectTodo(id: number): void {
    this.store.dispatch(selectTodo({id}));
  }

  isTodoDisabled$(id: number): Observable<boolean> {
    return this.store.pipe(select(isTodoDisable(id))).pipe();
  }

  // Subtask

  addSubtask(value: string, id: number): void {
    this.store.dispatch(addSubtaskStart({value, id}));
  }

  removeSubtask(id: number, subId: number): void {
    this.store.dispatch(removeSubtaskStart({id, subId}));
  }

  toggleActiveSubtask(id: number, subId: number): void {
    this.store.dispatch(toggleActiveSubtaskStart({id, subId}));
  }

  // Category
  selectCategories(categories: string[]): void {
    this.store.dispatch(selectCategories({categories}));
  }

}
