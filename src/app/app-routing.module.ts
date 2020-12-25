import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {path: 'main', loadChildren: './modules/user/user.module#UserModule'},
  // {path: '', loadChildren: './modules/guest/guest.module#GuestModule'}

  {path: 'main',  loadChildren: async () => (await import('./modules/user/user.module')).UserModule},
  {path: '',  loadChildren: async () => (await import('./modules/guest/guest.module')).GuestModule},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
