import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ArticleI, ArticleTranslatableFieldI, ArticleTranslatableProp} from '../../models/app.article.model';
import {BlogService} from "../../services/blog.service";
import {UserHttpService} from "../../../../../appCommon/services/user-http.service";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private userService: UserHttpService,
  ) {
  }

  ngOnInit(): void {
  }

  @Input() article: ArticleI;

  selectedLanguage = 'en';

  toggleLanguage(): void {
    this.selectedLanguage = this.selectedLanguage === 'en' ? 'ru' : 'en';
  }

  translate(prop: ArticleTranslatableProp): string {
    return (this.article[prop] as ArticleTranslatableFieldI[])
      .find((item) => item.lang === this.selectedLanguage)
      ?.content;
  }

  setMark(mark): void {
    this.blogService
      .setArticleMarks(this.article._id, {
        marks: [{user: this.userService.getCurrentUser().user_id, rate: mark}]
      })
      .subscribe();
  }

  private _getMarks(isPositive: boolean): number {
    console.log('marks', this.article._id, this.article.marks)
    if (this.article.marks) {
      return this.article.marks
        .map((mark) => mark.rate)
        .filter((rate) => isPositive ? rate > 0 : rate < 0)
        .reduce((sum, cur) => sum + Math.abs(cur), 0);
    } else {
      return null;
    }
  }

  get dislikes(): number {
    return this._getMarks(false);
  }

  get likes(): number {
    return this._getMarks(true);
  }

}
