import {Injectable} from '@angular/core';
import {ArticleI} from "../models/app.article.model";
import {Observable, of} from "rxjs";
import {BlogMockService} from "./blog-mock.service";
import {HttpClient} from "@angular/common/http";
import {AppConfigInitService} from "../../../../appCommon/services/app-config-init.service";
import {Store} from "@ngrx/store";
import {setMarkStart} from "../../../store/actions/articles.actions";

@Injectable({
  providedIn: 'root',
  // useExisting: BlogMockService,
})
export class BlogService {

  constructor(
  ) { }




}


