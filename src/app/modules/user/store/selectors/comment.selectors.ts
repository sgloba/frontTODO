import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CommentState} from "../reducers/comment.reducer";

const commentsState = createFeatureSelector<CommentState>('articles');

export const allComments = createSelector(
  commentsState,
  ({comments}) => {
    return comments;
  }
);
