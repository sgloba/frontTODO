import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {TodoI} from "../models/app.todo.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  getTodos(): Observable<TodoI[]> {
    return this.http.get<TodoI[]>('http://localhost:4444/api/todos');
  }

  removeTodo(_id) {
    return this.http.delete('')
  }
}
