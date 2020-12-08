import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {TodoListPageComponent} from "./components/todo-list/todo-list-page.component";
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http.service";


@NgModule({
  declarations: [
    AppComponent,
    TodoListPageComponent,
    TodoItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
