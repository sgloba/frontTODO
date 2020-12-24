import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {LoginGuard} from "./guards/login.guard";
import {MainPageComponent} from "./components/main-page/main-page.component";

const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: '', component: LoginComponent,  canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
