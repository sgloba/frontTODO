import {Observable, of} from "rxjs";
import {ArticleI} from "../models/app.article.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BlogMockService {

  fetchArticles$(): Observable<ArticleI[]> {


    return of(
      [{
        title: [
          {lang: 'en', content: 'en_mock_title'},
          {lang: 'ru', content: 'ru_mock_title'},
        ],
        author: 'test user MOCkED',
        body: [
          {lang: 'en', content: 'en_mock_body'},
          {lang: 'ru', content: 'ru_mock_body'},
        ],
        preview: [
          {lang: 'en', content: 'en_mock_preview'},
          {lang: 'ru', content: 'ru_mock_preview'},
        ],
        img: 'https://source.unsplash.com/random/220x220',
        marks: [
          {user: 'asd', rate: 1},
          {user: 'asd', rate: 1},
          {user: 'asd', rate: 1},
          {user: 'asd', rate: 1},
          {user: 'dff', rate: -1}
        ],
        comments: [
          {author: 'asd', body: 'addff'}
        ],
        tags: ['tag_1', 'tag_2']
      }]
    );
  }

}
