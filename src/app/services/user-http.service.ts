import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(
    private http: HttpClient,

  ) { }

  url = 'http://localhost:4444/api/auth';

  getCurrentUser() {

  }

  Register(username, password) {
    return this.http.post(`${this.url}/signup`, {username, password})
  }
  Login(username, password) {
    return this.http.post(`${this.url}/login`, {username, password}).pipe(
      map((res) => {
        localStorage.setItem('currentUser', JSON.stringify({ token: res}))
        return res
        }
      )
    )
  }

}
