import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../appCommon/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private route:Router,
    public authService: AuthService
  ) {}

  usernameInput: string
  passwordInput: string
  login: boolean = true;

  onRegister() {
    this.authService.SignUp(this.usernameInput, this.passwordInput)
  }

  onLogin() {
    this.authService.SignIn(this.usernameInput, this.passwordInput).then(() => {
      this.route.navigate(['/main'])
    })
  }

  onGoogleLogin() {
    this.authService.GoogleAuth().then(()=> {
      this.route.navigate(['/main'])
    })
  }
}

