import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable, of} from "rxjs";
import {CommentI} from "../../models/app.comment.model";
import {SandboxBlogService} from "../../services/sandbox-blog.service";
import {UserHttpService} from "../../../../../appCommon/services/user-http.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {

  constructor(
    private blogSandbox: SandboxBlogService,
    private userService: UserHttpService,
  ) {
  }


  @Input() comment: CommentI;

  userId = this.userService.getCurrentUser().user_id;

  setMark(mark): void {
    this.blogSandbox
      .setMarks(this.comment._id, {
        marks: [{user: this.userId, rate: mark}]
      }, 'comment');
  }

  get dislikes(): Observable<number> {
    return this.blogSandbox.totalDislikes$(this.comment._id, 'comment');
  }

  get likes(): Observable<number> {
    return this.blogSandbox.totalLikes$(this.comment._id, 'comment');
  }

}
