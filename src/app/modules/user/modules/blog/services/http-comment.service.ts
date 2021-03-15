import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AppConfigInitService} from "../../../../appCommon/services/app-config-init.service";
import {HttpClient} from "@angular/common/http";
import {CommentI} from "../models/app.comment.model";
import {FetchedCommentDataI} from "../models/app.fetchedCommentData";

@Injectable({
  providedIn: 'root'
})
export class HttpCommentService {

  constructor(
    private configService: AppConfigInitService,
    private http: HttpClient,
  ) {
  }

  get url(): string {
    return this.configService.config.nestJsURL;
  }

  fetchComments$(articleId, currentPage= 0): Observable<FetchedCommentDataI> {
    return this.http.get<FetchedCommentDataI>(this.url + '/comments' + `?article_id=${articleId}` + `&page=${currentPage}`);
  }
  setCommentMarks$(id, mark): Observable<any> {
    return this.http.put(this.url + `/comments/${id}`, mark);
  }
  createComment$({value, article_id}): Observable<any> {
    const comment = {
      article_id,
      body: value,
      timestamp: new Date().toLocaleString(),
      parent_comment_id: ''
    };
    return this.http.post(this.url + `/comments`, comment);
  }
}
