import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/reducers/todo.reducer';

import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/effects/todo.effects';

import { ToastrModule } from 'ngx-toastr';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoListPageComponent } from './components/todo-list/todo-list-page.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TodoHttpService} from './services/todo-http.service';
import { EditingTodoComponent } from './components/editing-todo/editing-todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ApiInterceptorService} from './services/api-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoListPageComponent,
    TodoItemComponent,
    EditingTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({todos: todoReducer}),
    EffectsModule.forRoot([TodoEffects]),
    ToastrModule.forRoot()
  ],
  providers: [TodoHttpService, ApiInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
