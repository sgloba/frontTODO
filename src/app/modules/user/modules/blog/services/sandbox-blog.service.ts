import {Injectable} from '@angular/core';
import {fetchArticlesStart, setMarkStart} from "../../../store/actions/articles.actions";
import {Store} from "@ngrx/store";
import {
  allArticles,
  totalMarks,
  articleById
} from "../../../store/selectors/articles.selectors";
import {Observable} from "rxjs";
import {ArticleI, ArticleTranslatableFieldI, ArticleTranslatableProp} from "../models/app.article.model";
import {isCommentMarkedByUser, totalCommentMarks} from "../../../store/selectors/comment.selectors";
import {setCommentsMarkStart} from "../../../store/actions/comments.actions";

@Injectable({
  providedIn: 'root'
})
export class SandboxBlogService {

  constructor(
    private store: Store
  ) {
  }

  allArticles$ = this.store.select(allArticles);

  articleById$(id): Observable<ArticleI> {
    return this.store.select(articleById(id));
  }

  totalLikes$(id: string, type: string): Observable<number> {
    if(type === 'comment') {
      return this.store.select(totalCommentMarks(id, 1));
    }
    if(type === 'article') {
      return this.store.select(totalMarks(id, 1));
    }
  }

  totalDislikes$(id: string, type: string): Observable<number> {
    if(type === 'comment') {
      return this.store.select(totalCommentMarks(id, -1));
    }
    if(type === 'article') {
      return this.store.select(totalMarks(id, -1));
    }
  }

  fetchAllArticles(): void {
    this.store.dispatch(fetchArticlesStart());
  }

  setMarks(id, mark, type): void {
    if (type === 'article') {
      this.store.dispatch(setMarkStart({id, mark}));
    }
    if (type === 'comment') {
      this.store.dispatch(setCommentsMarkStart({id, mark}));
    }
  }

  translate(article: ArticleI, prop: ArticleTranslatableProp, lang: string): string {
    const translatedProp = (article[prop] as ArticleTranslatableFieldI[])
      .find((item) => item.lang === lang)
      ?.content;
    if(!translatedProp) {
      return (article[prop] as ArticleTranslatableFieldI[])[0].content;
    } else {
      return translatedProp;
    }
  }
}
