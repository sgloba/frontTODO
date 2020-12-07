import { Injectable } from '@angular/core';

import { BehaviorSubject } from "rxjs";
import { TodoI } from "../models/app.todo.model";
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';



@Injectable({
  providedIn: 'root'
})
export class TasksSandboxService {

  constructor(
    private http: HttpService
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


  add(value: string):void {
    const todos = this.todos$.getValue()

    this.todos$.next([
      {
        value,
        _id: Math.floor(Math.random()*Number(Date.now())),
        timestamp: Date.now(),
        isCompleted: false
      },
       ...todos])
  }

  remove(id: number):void {
    const todos = this.todos$.getValue()
    this.todos$.next(todos.filter((item) => item._id !== id))

    // this.http.
  }

  toggleActive(id: number) {
    const todos = this.todos$.getValue()

    this.todos$.next(todos.map((item) => {
      return item._id !== id ? item : { ...item, isCompleted: !item.isCompleted };
    }))
  }
}
