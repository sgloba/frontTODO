import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainGuard} from "./modules/appCommon/guards/main.guard";
import {LoginGuard} from "./modules/appCommon/guards/login.guard";

const routes: Routes = [

  {path: 'main',  loadChildren: async () => (await import('./modules/user/user.module')).UserModule, canActivate: [MainGuard]},
  {path: '',  loadChildren: async () => (await import('./modules/guest/guest.module')).GuestModule, canActivate: [LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
