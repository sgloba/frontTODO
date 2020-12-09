import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {TodoI} from "../models/app.todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {

  constructor(
    private http: HttpClient,
  ) { }

  url = 'http://localhost:4444/api/todos'

  getTodos(): Observable<TodoI[]> {
    return this.http.get<TodoI[]>(this.url);
  }

  removeTodo(_id: number): Observable<any> {
    return this.http.delete(`${this.url}/${_id}`)
  }
  addTodo(value: string): Observable<any> {
   return this.http.post(this.url, {value: value})
  }

  toggleActive(_id: number): Observable<any> {
    return this.http.put(`${this.url}/${_id}/toggle`, {} )
  }

  editValue(_id, value: string):Observable<any> {
    return this.http.put(`${this.url}/${_id}`, {value: value})
  }
}
