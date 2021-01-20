import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import jwt_decode from "jwt-decode";
import {UserI} from "../models/app.user.model";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private toastr: ToastrService,
  ) { }

  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success(`user registered!`)
      }).catch((error) => {
        this.toastr.error(error.message)
        console.log(error)
      })
  }

  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        localStorage.setItem('currentUser', JSON.stringify({ token: (result.user as any).ya}))
      }).catch((error) => {
        this.toastr.error(error.message)
        console.log(error)
      })
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        return  result.user.getIdToken(true)
          .then((res)=> {
          localStorage.setItem('currentUser', JSON.stringify({token: res}))
        })
      }).catch((error) => {
        this.toastr.error(error.message)
        console.log(error)
      })
  }
  get isLoggedIn(): boolean {
    if(localStorage.getItem('currentUser')) {
      const decoded = JSON.parse(localStorage.getItem('currentUser'));
      const user: UserI = jwt_decode(decoded.token);
      console.log(user)
      return user.iss === "https://securetoken.google.com/angular-11-todo"
    } else {
      return false
    }
  }

  get currentUser(): UserI  {
    const token = localStorage.getItem('currentUser')
    return jwt_decode(token) as UserI;
  }

}
