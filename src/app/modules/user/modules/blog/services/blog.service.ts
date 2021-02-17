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
    private http: HttpClient,
    private configService: AppConfigInitService,
    private store: Store
  ) {
  }

  get url(): string {

    return this.configService.config.nestJsURL;
  }

  fetchArticles$(): Observable<ArticleI[]> {
    return this.http.get<ArticleI[]>(this.url + '/articles');
  }

  HTTPsetArticleMarks$(id, mark): Observable<any> {
    return this.http.put(this.url + `/articles/${id}`, mark);
  }

  setArticleMarks(id, mark): void{
    this.store.dispatch(setMarkStart({id, mark}));
  }
}


