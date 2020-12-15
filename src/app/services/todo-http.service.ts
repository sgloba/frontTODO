import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {TodoI} from '../models/app.todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {

  constructor(
    private http: HttpClient,
  ) { }

  url = 'http://localhost:4444/api/todos';

  getTodos(): Observable<TodoI[]> {
    return this.http.get<TodoI[]>(this.url);
  }

  removeTodo(id: number): Observable<TodoI> {
    return this.http.delete<TodoI>(`${this.url}/${id}`);
  }

  addTodo(value: string): Observable<TodoI> {
   return this.http.post<TodoI>(this.url, {value});
  }

  toggleActive(id: number): Observable<TodoI> {
    return this.http.put<TodoI>(`${this.url}/${id}/toggle`, {} );
  }

  editValue(id: number, value: string): Observable<TodoI> {
    return this.http.put<TodoI>(`${this.url}/${id}`, {value});
  }
}
