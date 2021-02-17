import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {Observable} from "rxjs";
import {ArticleI} from "../../models/app.article.model";
import {Store} from "@ngrx/store";
import {allArticles} from "../../../../store/selectors/articles.selectors";
import {fetchArticlesStart} from "../../../../store/actions/articles.actions";

@Component({
  selector: 'app-main-blog-page',
  templateUrl: './main-blog-page.component.html',
  styleUrls: ['./main-blog-page.component.scss']
})
export class MainBlogPageComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private store: Store

  ) { }

  ngOnInit(): void {
    this.store.dispatch(fetchArticlesStart());
  }

  articles$: Observable<ArticleI[]> = this.store.select(allArticles);
}
