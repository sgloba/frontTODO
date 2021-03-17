import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CommentState} from "../reducers/comment.reducer";

const commentsState = createFeatureSelector<CommentState>('comments');

export const allComments = createSelector(
  commentsState,
  ({comments}) => comments
);

export const commentById = (id: string) => createSelector(
  allComments,
  (comments) => comments.find((comment) => comment._id === id)
);

export const totalCommentMarks = (commentId: string, rate: 1 | -1) => createSelector(
  commentById(commentId),
  (comment) => {
    return comment?.marks.filter((mark) => mark.rate === rate).length;
  }
);

export const page = createSelector(
  commentsState,
  ({currentPage}) => currentPage
);

export const hasNextPageSelector = createSelector(
  commentsState,
  ({hasNextPage}) => hasNextPage
);

export const allCommentsIds = createSelector(
  allComments,
  (comments) => comments.map((comment) => comment._id)
);

