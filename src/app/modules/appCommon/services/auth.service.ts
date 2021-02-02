import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import jwt_decode from 'jwt-decode';
import {UserI} from '../models/app.user.model';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {UserHttpService} from './user-http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private toastr: ToastrService,
    private route: Router,
    private userHttpService: UserHttpService,
    public afAuth: AngularFireAuth,
  ) { }

  register (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.toastr.success(`${userCredential.user.email} registered`);
      })
      .catch((error) => {
        this.toastr.error(`${error.code} ${error.message}`);

      });
  }

  signIn (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        userCredential.user.getIdToken(true).then((res) => {
          localStorage.setItem('currentUser', JSON.stringify({token: res}));
        });
        this.userHttpService.getCurrentUser();
        this.route.navigate(['/main']);
        this.toastr.success(`${userCredential.user.email} signed in`);
      })
      .catch((error) => {
        this.toastr.error(`${error.code} ${error.message}`);
      });
  }

  GoogleAuth() {
    return this.GoogleAuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  GoogleAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.toastr.success(`${result.user.email} signed in`);

        return  result.user.getIdToken(true)
          .then((res) => {
          localStorage.setItem('currentUser', JSON.stringify({token: res}));
          this.route.navigate(['/main']);
          this.userHttpService.getCurrentUser();
          });
      }).catch((error) => {
        this.toastr.error(`${error.code} ${error.message}`);
      });
  }
  get isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser')) {
      const decoded = JSON.parse(localStorage.getItem('currentUser'));
      const user: UserI = jwt_decode(decoded.token);
      return user.iss === 'https://securetoken.google.com/angular-11-todo';
    } else {
      return false;

    }
  }
}
