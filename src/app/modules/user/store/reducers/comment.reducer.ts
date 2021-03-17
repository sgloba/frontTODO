import {createReducer, on} from '@ngrx/store';
import * as CommentAction from '../actions/comments.actions';
import {CommentI} from "../../modules/blog/models/app.comment.model";
import {setMarkHelper} from "../utils/store.utils";

export interface CommentState {
  comments: CommentI[];
  currentPage: number;
  hasNextPage: boolean;
}

export const initialState: CommentState = {
  comments: [],
  currentPage: 0,
  hasNextPage: false,
};

export const commentReducer = createReducer(
  initialState,
  on(CommentAction.setCommentsMark, (state, {id, mark}) => {
    const newComment = setMarkHelper(state, id, mark, 'comments');
    return {
      ...state,
      comments: state.comments.map((item) => {
        if (item._id !== id) {
          return item;
        }
        return newComment;
      })
    };
  }),
  on(CommentAction.fetchCommentsSuccess,
    (state, {comments, hasNextPage}) => {
      const stateCommentsIds = state.comments.map((comment) => comment._id);
      return ({...state,
        comments: [
          ...state.comments,
          ...comments.filter((comment) => !stateCommentsIds.includes(comment._id))],
        hasNextPage
      });
    }
  ),
  on(CommentAction.onCommentCreated,
    (state, {comment}) => {
      return ({...state,
      comments: [
        comment,
        ...state.comments
      ]
      });
    }
    ),
  on(CommentAction.setCommentsMarkError,
    ((state,{comment}) => {
      const comments = state.comments.map((item) => item._id === comment._id ? comment : item);
      return {...state, comments};
    })
  ),
  on(CommentAction.clearComments,
    (state) => ({...state, comments: [], hasNextPage: true, currentPage: 0})
    ),
  on(CommentAction.addCommentPage,
    (state) => ({...state, currentPage: state.currentPage + 1}))
);
