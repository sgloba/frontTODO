import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {activeTodos, allTodos, completedTodos} from "../store/selectors/todos.selectors";


import { TodoI } from "../models/app.todo.model";
import { TodoHttpService } from 'src/app/services/todo-http.service';
import {addTodo, editValue, fetchTodos, removeTodo, toggleActive} from "../store/actions/todo.actions";



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

  requestTodos() {
    this.store.dispatch(fetchTodos())
  }


  add(value: string) {
    this.store.dispatch(addTodo({ value }))
  }

  remove(id: number) {
    this.store.dispatch(removeTodo({_id: id}))
  }

  toggleActive(id: number) {
    this.store.dispatch(toggleActive({_id: id}))
  }

  editValue(_id: number, value: string) {
    this.store.dispatch(editValue({_id: _id, value: value}))
  }
}
