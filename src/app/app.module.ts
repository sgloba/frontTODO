import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './modules/material/material.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserModule} from '@angular/platform-browser';
import {ApiInterceptorService} from './modules/appCommon/services/api-interceptor.service';
import {AppConfigInitService} from './modules/appCommon/services/app-config-init.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {todoReducer} from './modules/user/store/reducers/todo.reducer';
import {filesReducer} from './modules/user/store/reducers/files.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TodoEffects} from './modules/user/store/effects/todo.effects';
import {FilesEffects} from './modules/user/store/effects/files.effects';
import {articleReducer} from "./modules/user/store/reducers/articles.reducer";
import {ArticlesEffects} from "./modules/user/store/effects/articles.effects";
import {commentReducer} from "./modules/user/store/reducers/comment.reducer";
import {CommentsEffect} from "./modules/user/store/effects/comments.effect";



@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AppRoutingModule,
      MaterialModule,
      CommonModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ToastrModule.forRoot(),
      BrowserModule,
      StoreModule.forRoot({
        todos: todoReducer,
        files: filesReducer,
        articles: articleReducer,
        comments: commentReducer
      }),
      EffectsModule.forRoot([TodoEffects, FilesEffects, ArticlesEffects, CommentsEffect]),
    ],
  providers: [
    ApiInterceptorService,
    AppConfigInitService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
