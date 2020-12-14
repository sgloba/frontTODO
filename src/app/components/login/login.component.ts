import { Component, OnInit } from '@angular/core';
import {UserHttpService} from "../../services/user-http.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userHttpService: UserHttpService,
    private route:Router
  ) { }

  ngOnInit(): void {
  }

  login: boolean = true
  register: boolean = false

  usernameInput: string
  passwordInput: string


  onRegister(username, password) {
    this.userHttpService.Register(username, password).subscribe()
  }

  onLogin(username, password) {
    this.userHttpService.Login(username, password).subscribe((res) => {

      this.route.navigate(['/todos'])
    })
  }
}
