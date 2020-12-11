import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  activeTodos,
  allTodos,
  completedTodos,
  initialEditingValue,
  isTodoEditing, newEditingValue
} from '../store/selectors/todos.selectors';


import { TodoI } from '../models/app.todo.model';
import { TodoHttpService } from 'src/app/services/todo-http.service';
import {
  addTodo,
  editValue,
  fetchTodos,
  removeTodo,
  setInitialTodoEditingValue, setNewTodoEditingValue,
  toggleActive
} from '../store/actions/todo.actions';



@Injectable({
  providedIn: 'root'
})
export class TasksSandboxService {

  constructor(
    private http: TodoHttpService,
    private store: Store
  ) { }


  activeTodos$ = this.store.pipe(select(activeTodos));
  completedTodos$ = this.store.pipe(select(completedTodos));
  allTodos$ = this.store.pipe(select(allTodos));

  isEditing$ = this.store.pipe(select(isTodoEditing));
  initialEditingValue = this.store.pipe(select(initialEditingValue));
  newEditingValue = this.store.pipe(select(newEditingValue));


  requestTodos(): void {
    this.store.dispatch(fetchTodos());
  }


  add(value: string): void {
    this.store.dispatch(addTodo({ value }));
  }

  remove(id: number): void {
    this.store.dispatch(removeTodo({_id: id}));
  }

  toggleActive(id: number): void {
    this.store.dispatch(toggleActive({_id: id}));
  }

  editValue(id: number, value: string): void {
    this.store.dispatch(editValue({_id: id, value}));
  }


  setInitialEditingValue(value): void {
    this.store.dispatch(setInitialTodoEditingValue({value}));
  }
  setNewEditingValue(value: string): void {
    this.store.dispatch(setNewTodoEditingValue({value}));
  }
}
