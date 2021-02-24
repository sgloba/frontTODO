import { Component, OnInit } from '@angular/core';
import {SandboxBlogService} from "../../services/sandbox-blog.service";

@Component({
  selector: 'app-blog-init',
  templateUrl: './blog-init.component.html',
  styleUrls: ['./blog-init.component.scss']
})
export class BlogInitComponent implements OnInit {

  constructor(
    private blogSandbox: SandboxBlogService,
  ) { }

  ngOnInit(): void {
    this.blogSandbox.fetchAllArticles();
  }

}
