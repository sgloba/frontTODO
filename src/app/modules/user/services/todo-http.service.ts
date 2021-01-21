import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {TodoI} from '../models/app.todo.model';
import {AppConfigInitService} from '../../appCommon/services/app-config-init.service';

@Injectable({
  providedIn: 'root'
})
export class TodoHttpService {

  constructor(
    private http: HttpClient,
    private configService: AppConfigInitService
  ) { }

  url = this.configService.config.backendUrl;

  getTodos(): Observable<TodoI[]> {
    return this.http.get<TodoI[]>(this.url + '/todos');
  }

  removeTodo(id: number): Observable<TodoI> {
    return this.http.delete<TodoI>(`${this.url}/todos/${id}`);
  }

  addTodo(value: string): Observable<TodoI> {
   return this.http.post<TodoI>(this.url + '/todos', {value});
  }

  toggleActive(id: number): Observable<TodoI> {
    return this.http.put<TodoI>(`${this.url}/todos/${id}/toggle`, {} );
  }

  editValue(id: number, value: string): Observable<TodoI> {
    return this.http.put<TodoI>(`${this.url}/todos/${id}`, {value});
  }

  // Subtask

  addSubtask(value: string, id: number): Observable<TodoI> {
    return this.http.put<TodoI>(`${this.url}/todos/${id}/subtask/add`, {value});
  }

  removeSubtask(id: number, subId: number): Observable<TodoI> {
    return this.http.delete<TodoI>(`${this.url}/todos/${id}/subtask/${subId}/delete`);
  }

  toggleActiveSubtask(id: number, subId: number): Observable<TodoI> {
    return this.http.put<TodoI>(`${this.url}/todos/${id}/subtask/${subId}/toggle`, {});
  }

}

