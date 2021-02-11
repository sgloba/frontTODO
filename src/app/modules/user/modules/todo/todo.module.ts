import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksSandboxService} from "./services/tasks-sandbox.service";
import {TodoHttpService} from "./services/todo-http.service";
import {TodoListPageComponent} from "./components/todo-list/todo-list-page.component";
import {TodoItemComponent} from "./components/todo-item/todo-item.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MaterialModule} from "../../../material/material.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {TodoRoutingModule} from "./todo-routing.module";
import {AppCommonModule} from "../../../appCommon/appCommon.module";



@NgModule({
  declarations: [
    TodoListPageComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule,
    DragDropModule,
    TodoRoutingModule
  ],
  providers: [
    TasksSandboxService,
    TodoHttpService,
  ]
})
export class TodoModule { }
