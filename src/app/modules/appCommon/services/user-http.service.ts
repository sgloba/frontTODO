import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from "rxjs/operators";
import jwt_decode from 'jwt-decode';
import {UserI} from "../models/app.user.model";
import {Observable} from "rxjs";
import {UserRegistrationResponseI} from "../models/app.user-registration-response.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(
    private http: HttpClient,

  ) { }

  url = environment.API_URL_AUTH;


  getCurrentUser(): UserI  {
    const token = localStorage.getItem('currentUser')
    return jwt_decode(token) as UserI;
  }

  validateUser(): boolean {
    if(localStorage.getItem('currentUser')) return true
    return false
  }

  register(username, password): Observable<UserRegistrationResponseI> {
    return this.http.post<UserRegistrationResponseI>(`${this.url}/signup`, {username, password})
  }

  login(username, password): Observable<string> {
    return this.http.post<string>(`${this.url}/login`, {username, password}).pipe(
      tap((res) => {
        localStorage.setItem('currentUser', JSON.stringify({ token: res}))
        return res
        }
      )
    )
  }

}
