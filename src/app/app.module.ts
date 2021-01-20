import {APP_INITIALIZER, forwardRef, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from "./modules/material/material.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserModule} from "@angular/platform-browser";
import {ApiInterceptorService} from "./modules/appCommon/services/api-interceptor.service";
import {AppConfigInitService} from "./modules/appCommon/services/app-config-init.service";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {environment} from "../environments/environment";
import {AppConfigInitServiceFactory} from "./modules/appCommon/factorys/AppConfigInitServiceFactory";

let firebaseConfig = null;

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
      // AngularFireModule.initializeApp(environment.firebase),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      AppRoutingModule,
      MaterialModule,
      CommonModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      BrowserModule,
    ],
  providers: [
    ApiInterceptorService,
    AppConfigInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigInitServiceFactory,
      deps: [AppConfigInitService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  static config = null;

  constructor(private readonly configService: AppConfigInitService) {
    this.configService.init()
    // this.configService.init().subscribe((config) => {
    //   console.log('this.configService.config', this.configService.config);
    //   firebaseConfig = this.configService.config.firebaseConfig;
    //   console.log('firebaseConfig', firebaseConfig)
    // })
    AppModule.config = this.configService.config;
    console.log('config in module', AppModule.config);
  }
}
