import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {CommentI} from '../../models/app.comment.model';
import {SandboxBlogService} from '../../services/sandbox-blog.service';
import {UserHttpService} from '../../../../../appCommon/services/user-http.service';
import {HttpCommentService} from '../../services/http-comment.service';
import {SandboxCommentService} from '../../services/sandbox-comment.service';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnChanges {

  constructor(
    private blogSandbox: SandboxBlogService,
    private userService: UserHttpService,
    private httpCommentService: HttpCommentService,
    private commentSandbox: SandboxCommentService,
  ) {
  }


  @Input() comment: CommentI;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.comment) {
      this.childComments$ = this.commentSandbox.commentsByParentCommentId$(this.comment._id);
      this.isShowReply$ = this.commentSandbox.showReplies$(this.comment._id);
    }
  }

  childComments$: Observable<CommentI[]>;
  isShowReply$: Observable<boolean>;
  hasNextPage$ = this.commentSandbox.hasNextPage$;

  showReplyInput = false;
  page = 0;
  userId = this.userService.getCurrentUser().user_id;
  page$ = this.commentSandbox.page$.pipe(map((page) => {
    console.log('PAGE', page);
    this.page = page;
  }));

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

  createComment(articleId, value, event): void {
    if (!value.trim()) {
      return;
    }
    const data = {
      value,
      article_id: articleId,
      parentCommentId: this.comment._id
    };
    this.commentSandbox.createComment(data);
    event.target.reset();
  }

  showReply(): void {
    this.isShowReply$
      .pipe(take(1))
      .subscribe((showReply) => {
        this.commentSandbox.toggleShowReply(this.comment._id);
        if (!showReply) {
          this.commentSandbox.fetchComments(this.comment.article_id, this.page, this.comment._id);
        }
      });
  }
  showMoreComments(id) {

  }
}
