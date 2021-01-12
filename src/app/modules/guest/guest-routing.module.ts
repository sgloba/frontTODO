import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainGuard} from "../appCommon/guards/main.guard";

const routes: Routes = [
  {path: '', component: LoginComponent, },
];
// canActivate: [MainGuard]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
