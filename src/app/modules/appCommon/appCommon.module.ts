import { NgModule } from '@angular/core';

import { AppCommonRoutingModule } from './appCommon-routing.module';
import { ToggleBtnComponent } from './components/toggle-btn/toggle-btn.component';
import { StopClickPropagationDirective } from './directives/stop-click-propagation.directive';
import {MaterialModule} from "../material/material.module";
import {LoginGuard} from "./guards/login.guard";
import {UserHttpService} from "./services/user-http.service";
import {ApiInterceptorService} from "./services/api-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    ToggleBtnComponent,
    StopClickPropagationDirective,
  ],
  imports: [
    AppCommonRoutingModule,
    MaterialModule,
    CommonModule
  ],
  exports: [
    ToggleBtnComponent,
    StopClickPropagationDirective,
  ],
  providers: [LoginGuard, UserHttpService]
})
export class AppCommonModule { }
