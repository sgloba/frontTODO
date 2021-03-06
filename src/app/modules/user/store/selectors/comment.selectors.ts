import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CommentState} from '../reducers/comment.reducer';

const commentsState = createFeatureSelector<CommentState>('comments');

export const allComments = createSelector(
  commentsState,
  ({comments}) => comments
);

export const commentById = (id: string) => createSelector(
  allComments,
  (comments) => comments.find((comment) => comment._id === id)
);

export const topLevelCommentsByArticleId = (id: string) => createSelector(
  allComments,
  (comments) => comments.filter((comment) => comment.article_id === id && comment.parent_comment_id === '')
);
export const commentsByParentCommentId = (id: string) => createSelector(
  allComments,
  (comments) => comments.filter((comment) => comment.parent_comment_id === id)
);

export const totalCommentMarks = (commentId: string, rate: 1 | -1) => createSelector(
  commentById(commentId),
  (comment) => comment?.marks.filter((mark) => mark.rate === rate).length
);

export const page = createSelector(
  commentsState,
  ({currentPage}) => currentPage
);
export const pageInCommentById = (commentId: string) => createSelector(
  commentById(commentId),
  (comment) => comment?.currentPage
);

export const hasNextPageArticleSelector = createSelector(
  commentsState,
  ({hasNextPage}) => hasNextPage
);
export const hasNextPageCommentSelector = (commentId: string) => createSelector(
  commentById(commentId),
  allComments,
  ({_id, replies}, comments) => comments.filter((comment) => comment.parent_comment_id === _id).length < replies
);

export const showReplySelector = createSelector(
  commentsState,
  ({showReplyCommentsIds}) => showReplyCommentsIds
);



