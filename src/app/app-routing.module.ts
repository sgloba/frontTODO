import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainGuard} from './modules/appCommon/guards/main.guard';
import {FileUploadComponent} from './modules/user/components/file-upload/file-upload.component';


const routes: Routes = [

  {path: 'main',  loadChildren: async () => (await import('./modules/user/user.module')).UserModule, canActivate: [MainGuard]},
  {path: '',  loadChildren: async () => (await import('./modules/guest/guest.module')).GuestModule},
  {path: 'upload', component: FileUploadComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
