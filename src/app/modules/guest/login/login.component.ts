import { Component } from '@angular/core';
import {UserHttpService} from '../../appCommon/services/user-http.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
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

  onRegister() {
    this.authService.register(this.usernameInput, this.passwordInput);
  }

  onLogin() {
    this.authService.signIn(this.usernameInput, this.passwordInput);
  }

  onGoogleLogin() {
    this.authService.GoogleAuth();
  }
}

