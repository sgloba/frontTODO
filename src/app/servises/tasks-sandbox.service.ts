import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { TodoI } from "../models/app.todo.model";

@Injectable({
  providedIn: 'root'
})
export class TasksSandboxService {

  constructor() { }

  todos$ : BehaviorSubject<TodoI[]> = new BehaviorSubject([])

  add(value: string):void {
    const todos = this.todos$.getValue()

    this.todos$.next([
      {
        value,
        id: Math.floor(Math.random()*Number(Date.now())),
        timestamp: Date.now(),
        isCompleted: false
      },
       ...todos])
  }

  remove(id: number):void {
    const todos = this.todos$.getValue()
    this.todos$.next(todos.filter((item) => item.id !== id))
  }

  toggleActive(id: number) {
    const todos = this.todos$.getValue()

    this.todos$.next(todos.map((item) => {
      return item.id !== id ? item : { ...item, isCompleted: !item.isCompleted };
    }))
  }
}
