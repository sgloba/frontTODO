import { Injectable } from '@angular/core';
import {AppConfigInitService} from "../../../../appCommon/services/app-config-init.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleI} from "../models/app.article.model";

@Injectable({
  providedIn: 'root'
})
export class HttpBlogService {

  constructor(
    private configService: AppConfigInitService,
    private http: HttpClient,
  ) { }

  get url(): string {
    return this.configService.config.nestJsURL;
  }

  fetchArticles$(): Observable<ArticleI[]> {
    return this.http.get<ArticleI[]>(this.url + '/articles');
  }
  setArticleMarks$(id, mark): Observable<any> {
    return this.http.put(this.url + `/articles/${id}`, mark);
  }

}
