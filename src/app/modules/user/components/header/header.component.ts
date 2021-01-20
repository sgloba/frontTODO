import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserI} from "../../../appCommon/models/app.user.model";
import {AuthService} from "../../../appCommon/services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private AuthService: AuthService,
    private route:Router
  ) {}

  user: UserI = this.AuthService.currentUser

  userDisplay = this.user.name ? this.user.name : this.user.email
  usePicSrc = this.user.picture ? this.user.picture : 'https://source.unsplash.com/random/40x40'

  logout(): void {
    localStorage.removeItem('currentUser')
    this.route.navigate(['/'])
  }
}
