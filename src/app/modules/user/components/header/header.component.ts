import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserI} from '../../../appCommon/models/app.user.model';
import {UserHttpService} from '../../../appCommon/services/user-http.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private userHttpService: UserHttpService,
    private route: Router
  ) {}

  user: UserI = this.userHttpService.getCurrentUser();


  logout(): void {
    localStorage.removeItem('currentUser');
    this.route.navigate(['/']);
  }
}
