import { Component } from '@angular/core';
import {UserHttpService} from "../../appCommon/services/user-http.service";
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private userHttpService: UserHttpService,
    private route:Router,
    private toastr: ToastrService,
  ) { }



  login: boolean = true

  usernameInput: string
  passwordInput: string

  onRegister() {
    this.userHttpService.register(this.usernameInput, this.passwordInput).subscribe((res: any) => {
      console.log(res)
      this.toastr.success(`${res.message}`)
    })
  }

  onLogin() {
    this.userHttpService.login(this.usernameInput, this.passwordInput).subscribe(() => {
      this.route.navigate(['/main'])
      this.userHttpService.getCurrentUser()
    })
  }
}

