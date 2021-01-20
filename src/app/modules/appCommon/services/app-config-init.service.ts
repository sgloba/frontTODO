import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {skip, take, tap} from "rxjs/operators";

import { environment } from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AppConfigInitService {

  constructor(
    private http: HttpClient,

  ) { }

  private readonly PORT = '8080';

  private _config = {
    backendUrl: null,
    firebaseConfig: null
  }

  get config() {
    return this._config;
  }

  init() {
    const { protocol, hostname } = window.location;
    const portPostfix = environment.production ? '' : `:${this.PORT}`;
    const url = `${protocol}//${hostname}${portPostfix}` + '/config';


    return new Promise<void>((resolve, reject) => {
      console.log("init() called");
      // do your initialisation stuff here


      // setTimeout(() => {
      //   console.log('init() Finished');
      //   resolve();
      // }, 3000);

      this.http.get<any>(url)
        .pipe(
          take(1),
          tap((config) => {
            environment.firebaseConfig = config.firebaseConfig;
            console.log('config http', config);
            this._config = {
              ...config,
              firebaseConfig: config.firebaseConfig
            };
          })
        ).subscribe(() => {
          resolve()
      })

    });

  }

  // initConfig() {
  //   return this.init().toPromise();
  // }

}
