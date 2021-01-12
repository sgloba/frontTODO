import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
  ) { }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!')
        return  result.user.getIdToken(true)
          .then((res)=> {
          localStorage.setItem('currentUser', JSON.stringify({token: res}))

        })
      }).catch((error) => {
        console.log(error)
      })
  }
  get isLoggedIn(): boolean {
    if(localStorage.getItem('currentUser')) {
      const decoded = JSON.parse(localStorage.getItem('currentUser'));
      const user = jwt_decode(decoded.token);
      console.log(user)
      return user.email_verified
    } else {
      return false
    }
  }
}
