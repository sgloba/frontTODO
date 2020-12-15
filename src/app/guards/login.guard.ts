import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserHttpService} from "../services/user-http.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate{
  constructor(
    private userHttpService: UserHttpService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
    return !this.userHttpService.validateUser();
  }
}
