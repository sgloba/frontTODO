import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import { TodoI } from "../models/app.todo.model";
import { map } from 'rxjs/operators';
import { TodoHttpService } from 'src/app/services/todo-http.service';



@Injectable({
  providedIn: 'root'
})
export class TasksSandboxService {

  constructor(
    private http: TodoHttpService
  ) { }

  todos$ : BehaviorSubject<TodoI[]> = new BehaviorSubject([])

  activeTodos$ = this.todos$.pipe(map((item) => item.filter((todo) => todo.isCompleted === false)
  ))
  completedTodos$ = this.todos$.pipe(map((item) => item.filter((todo) => todo.isCompleted === true)
  ))

  request() {
    this.http.getTodos().subscribe((response) => {
      this.todos$.next(response)
    })
  }


  add(value: string) {
    return this.http.addTodo(value)
  }

  remove(id: number): Observable<any> {
    return this.http.removeTodo(id)
  }

  toggleActive(_id: number) {
    return this.http.toggleActive(_id)
  }

  editValue(_id: number, value: string) {
    return this.http.editValue(_id, value)
  }
}
