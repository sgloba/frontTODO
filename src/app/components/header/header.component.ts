import { Component } from '@angular/core';
import {UserHttpService} from "../../services/user-http.service";
import {UserI} from "../../models/app.user.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private userHttpService: UserHttpService,
    private route:Router
  ) {}

  user: UserI = this.userHttpService.getCurrentUser()


  logout(): void {
    localStorage.removeItem('currentUser')
    this.route.navigate(['/'])
  }
}
