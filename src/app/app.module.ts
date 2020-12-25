import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from "./modules/material/material.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserModule} from "@angular/platform-browser";
import {ApiInterceptorService} from "./modules/appCommon/services/api-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
      AppRoutingModule,
      MaterialModule,
      CommonModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      BrowserModule
    ],
  providers: [
    ApiInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
