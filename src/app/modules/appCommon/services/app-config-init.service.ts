import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {take} from 'rxjs/operators';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppConfigInitService {

  constructor(
    private http: HttpClient,

  ) { }

  private readonly PORT = '8080';

  // tslint:disable-next-line:variable-name
  private _config = {
    backendUrl: 'backendUrl'
  };

  get config() : object {
    return this._config;
  }

  init(): void {
    const { protocol, hostname } = window.location;
    const portPostfix = environment.production ? '' : `:${this.PORT}`;
    const url = `${protocol}//${hostname}${portPostfix}` + '/config';
    this.http.get<any>(url)
      .pipe(take(1))
      .subscribe((config) => {
        this._config = config;
      });
  }

}
