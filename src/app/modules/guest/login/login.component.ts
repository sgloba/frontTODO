import { Component } from '@angular/core';
import {UserHttpService} from '../../appCommon/services/user-http.service';
import {Router} from '@angular/router';

import {AuthService} from '../../appCommon/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    public authService: AuthService
  ) { }

  login = true;

  usernameInput: string;
  passwordInput: string;

  onRegister(): void {
    this.authService.register(this.usernameInput, this.passwordInput);
  }

  onLogin(): void {
    this.authService.signIn(this.usernameInput, this.passwordInput);
  }

  onGoogleLogin(): void {
    this.authService.GoogleAuth();
  }
}

