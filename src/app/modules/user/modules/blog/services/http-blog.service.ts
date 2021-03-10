import {Injectable} from '@angular/core';
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
  ) {
  }

  private readonly IMG_PROP_KEY = 'fileImg';

  get url(): string {
    return this.configService.config.nestJsURL;
  }

  fetchArticles$(): Observable<ArticleI[]> {
    return this.http.get<ArticleI[]>(this.url + '/articles');
  }

  setArticleMarks$(id, mark): Observable<any> {
    return this.http.put(this.url + `/articles/${id}`, mark);
  }

  createArticle$(data): Observable<any> {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (key === this.IMG_PROP_KEY) {
        formData.append(this.IMG_PROP_KEY, data[key][0]);
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    });

    return this.http.post(this.url + `/articles`, formData);
  }

}
