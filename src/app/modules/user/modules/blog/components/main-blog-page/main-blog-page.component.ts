import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";
import {Observable} from "rxjs";
import {ArticleI} from "../../models/app.article.model";

@Component({
  selector: 'app-main-blog-page',
  templateUrl: './main-blog-page.component.html',
  styleUrls: ['./main-blog-page.component.scss']
})
export class MainBlogPageComponent implements OnInit {

  constructor(
    private blogService: BlogService,
  ) {
  }

  ngOnInit(): void {
  }
  articles$: Observable<ArticleI[]> = this.blogService.fetchArticles$();

}
