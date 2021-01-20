import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate{
  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {

    if (!this.AuthService.isLoggedIn) {
      return true
    } else {
      this.router.navigate(['main']);
      return false
    }
  }
}
