import { NgModule } from '@angular/core';

import { AppCommonRoutingModule } from './appCommon-routing.module';
import { ToggleBtnComponent } from './components/toggle-btn/toggle-btn.component';
import { StopClickPropagationDirective } from './directives/stop-click-propagation.directive';
import {MaterialModule} from "../material/material.module";
import {LoginGuard} from "./guards/login.guard";
import {UserHttpService} from "./services/user-http.service";
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
