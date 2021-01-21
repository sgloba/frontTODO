import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserHttpService} from '../services/user-http.service';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class MainGuard implements CanActivate{
  constructor(
    private userHttpService: UserHttpService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.AuthService.isLoggedIn) {
      console.log('canActivate', this.AuthService.isLoggedIn);
      return true;
    } else {
      console.log('canActivate', this.AuthService.isLoggedIn);
      this.router.navigate(['']);
      return false;
    }
  }
}
