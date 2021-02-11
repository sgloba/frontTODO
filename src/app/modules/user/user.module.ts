import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import {AsideComponent} from './components/aside/aside.component';
import {FloatingActionBtnsComponent} from './components/floating-action-btns/floating-action-btns.component';
import {HeaderComponent} from './components/header/header.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppCommonModule} from '../appCommon/appCommon.module';
import {MaterialModule} from '../material/material.module';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SearchInputComponent } from './components/search-input/search-input.component';



@NgModule({
  declarations: [
    AsideComponent,
    FloatingActionBtnsComponent,
    HeaderComponent,
    MainPageComponent,
    SearchInputComponent,
  ],
    imports: [
        AppCommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        MaterialModule,
        CommonModule,
        DragDropModule,
    ],
  providers: [

  ]
})
export class UserModule { }
