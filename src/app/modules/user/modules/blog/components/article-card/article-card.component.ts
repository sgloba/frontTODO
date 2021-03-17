import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ArticleI, ArticleTranslatableProp} from '../../models/app.article.model';
import {UserHttpService} from "../../../../../appCommon/services/user-http.service";
import {SandboxBlogService} from "../../services/sandbox-blog.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent {

  constructor(
    private blogSandbox: SandboxBlogService,
    private userService: UserHttpService,
  ) {
  }

  @Input() article: ArticleI;

  selectedLanguage = 'en';
  userId = this.userService.getCurrentUser().user_id;

  toggleLanguage(): void {
    this.selectedLanguage = this.selectedLanguage === 'en' ? 'ru' : 'en';
  }

 translate(article: ArticleI, prop: ArticleTranslatableProp, lang: string): string {
    return this.blogSandbox.translate(article, prop, lang);
 }

  setMark(mark): void {
    this.blogSandbox
      .setMarks(this.article._id, {
        marks: [{user: this.userId, rate: mark}]
      }, 'article');
  }

  get dislikes(): Observable<number> {
    return this.blogSandbox.totalDislikes$(this.article._id, 'article');
  }

  get likes(): Observable<number> {
    return this.blogSandbox.totalLikes$(this.article._id, 'article');
  }

}
