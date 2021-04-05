import { Injectable } from '@angular/core';
import {AppConfigInitService} from "../../appCommon/services/app-config-init.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(
    private configService: AppConfigInitService,
    private http: HttpClient,
  ) { }


  get url(): string {
    return this.configService.config.nestJsURL;
  }

  fetchUsersByEmail$(email): any {
    const email1 = ['sgloba.exceedteam@gmail.com', '155@155.155', 'qwe@gg.j']
    return this.http.get<any>(this.url + `/user` + `?email=${email1}`).subscribe((res) => console.log('RES', res));
  }
}
