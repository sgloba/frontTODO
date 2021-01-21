import { NgModule } from '@angular/core';

import { GuestRoutingModule } from './guest-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {AppCommonModule} from '../appCommon/appCommon.module';
import {MaterialModule} from '../material/material.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    AppCommonModule,
    GuestRoutingModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ],
  exports: [LoginComponent]
})
export class GuestModule { }
