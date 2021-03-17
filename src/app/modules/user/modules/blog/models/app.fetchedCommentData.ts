import {CommentI} from "./app.comment.model";

export interface FetchedCommentDataI {
  comments: CommentI[];
  hasNextPage: boolean;
}
