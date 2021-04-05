import { NgModule } from '@angular/core';

import { AppCommonRoutingModule } from './appCommon-routing.module';
import { ToggleBtnComponent } from './components/toggle-btn/toggle-btn.component';
import { StopClickPropagationDirective } from './directives/stop-click-propagation.directive';
import {MaterialModule} from '../material/material.module';
import {MainGuard} from './guards/main.guard';
import {UserHttpService} from './services/user-http.service';
import {CommonModule} from '@angular/common';
import { UserTooltipDirective } from './directives/user-tooltip.directive';
import { UserTooltipComponent } from './components/user-tooltip/user-tooltip.component';




@NgModule({
  declarations: [
    ToggleBtnComponent,
    StopClickPropagationDirective,
    UserTooltipDirective,
    UserTooltipComponent,
  ],
  imports: [
    AppCommonRoutingModule,
    MaterialModule,
    CommonModule
  ],
    exports: [
        ToggleBtnComponent,
        StopClickPropagationDirective,
        UserTooltipDirective,
    ],
  providers: [MainGuard, UserHttpService]
})
export class AppCommonModule { }
