import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {CommentI} from "../../models/app.comment.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() comment: CommentI;

  comment$: Observable<CommentI> = of(
    {
      _id: '124sf',
      parent_comment_id: 'www312',
      article_id: 'mongo obj id',
      body: 'commentcommentcommentcommentcommentcommentcommentcommentcommentcomment',
      author: {
        uid: 'sad',
        email: 'qwr@qwe.sc',
        displayName: 'test usr',
        photoURL: 'https://source.unsplash.com/70x70',
      },
      timestamp: new Date().toLocaleString(),
      marks: [{user: 'asd', rate: 1}]
    }
  );

  isLikedByUser: Observable<any>
  isDislikedByUser: Observable<any>
  likes = 2;
  dislikes = 0;

  setMark(x) {

  }

}
