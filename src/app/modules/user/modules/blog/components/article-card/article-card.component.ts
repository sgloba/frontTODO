import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ArticleI, ArticleTranslatableFieldI, ArticleTranslatableProp} from '../../models/app.article.model';
import {UserHttpService} from "../../../../../appCommon/services/user-http.service";
import {SandboxBlogService} from "../../services/sandbox-blog.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent implements OnInit {

  constructor(
    private blogSandbox: SandboxBlogService,
    private userService: UserHttpService,
  ) {
  }

  ngOnInit(): void {
  }

  @Input() article: ArticleI;

  selectedLanguage = 'en';
  userId = this.userService.getCurrentUser().user_id;

  toggleLanguage(): void {
    this.selectedLanguage = this.selectedLanguage === 'en' ? 'ru' : 'en';
  }

  translate(prop: ArticleTranslatableProp): string {
    const translatedProp = (this.article[prop] as ArticleTranslatableFieldI[])
      .find((item) => item.lang === this.selectedLanguage)
      ?.content;
    if(!translatedProp) {
      return (this.article[prop] as ArticleTranslatableFieldI[])[0].content;
    } else {
      return translatedProp;
    }
  }

  setMark(mark): void {
    this.blogSandbox
      .setArticleMarks(this.article._id, {
        marks: [{user: this.userId, rate: mark}]
      });
  }

  get dislikes(): Observable<number> {
    return this.blogSandbox.totalDislikes$(this.article._id);
  }

  get likes(): Observable<number> {
    return this.blogSandbox.totalLikes$(this.article._id);
  }

  get isLikedByUser(): Observable<boolean> {
    return this.blogSandbox.isLikedByUser(this.article._id, this.userId);
  }
  get isDislikedByUser(): Observable<boolean> {
    return this.blogSandbox.isDislikedByUser(this.article._id, this.userId);
  }
}
