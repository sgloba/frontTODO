import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserRoutingModule } from './user-routing.module';
import {AsideComponent} from "./components/aside/aside.component";
import {FloatingActionBtnsComponent} from "./components/floating-action-btns/floating-action-btns.component";
import {HeaderComponent} from "./components/header/header.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {TodoItemComponent} from "./components/todo-item/todo-item.component";
import {TodoListPageComponent} from "./components/todo-list/todo-list-page.component";
import {todoReducer} from "./store/reducers/todo.reducer";
import {TodoEffects} from "./store/effects/todo.effects";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AppCommonModule} from "../appCommon/appCommon.module";
import {MaterialModule} from "../material/material.module";
import {CommonModule} from "@angular/common";
import {TasksSandboxService} from "./services/tasks-sandbox.service";
import {TodoHttpService} from "./services/todo-http.service";
import {DragDropModule} from "@angular/cdk/drag-drop";



@NgModule({
  declarations: [
    AsideComponent,
    FloatingActionBtnsComponent,
    HeaderComponent,
    MainPageComponent,
    TodoItemComponent,
    TodoListPageComponent,

  ],
    imports: [
        AppCommonModule,
        UserRoutingModule,
        StoreModule.forRoot({todos: todoReducer}),
        EffectsModule.forRoot([TodoEffects]),
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        MaterialModule,
        CommonModule,
        DragDropModule
    ],
  providers: [
    TasksSandboxService,
    TodoHttpService,
  ]
})
export class UserModule { }
