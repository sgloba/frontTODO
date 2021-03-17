import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ArticleI} from "../../models/app.article.model";
import {SandboxBlogService} from "../../services/sandbox-blog.service";

@Component({
  selector: 'app-main-blog-page',
  templateUrl: './main-blog-page.component.html',
  styleUrls: ['./main-blog-page.component.scss']
})
export class MainBlogPageComponent implements OnInit {

  constructor(
    private blogSandbox: SandboxBlogService,
  ) { }

  ngOnInit(): void {
  }

  articles$: Observable<ArticleI[]> = this.blogSandbox.allArticles$;
}
