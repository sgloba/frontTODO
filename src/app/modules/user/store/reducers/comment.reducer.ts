import {createReducer, on} from '@ngrx/store';
import * as CommentAction from '../actions/comments.actions';
import {CommentI} from "../../modules/blog/models/app.comment.model";
import {setMarkHelper} from "../utils/store.utils";

export interface CommentState {
  comments: CommentI[];
}

export const initialState: CommentState = {
  comments: [],
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
    (state, {comments}) => {
      return ({...state, comments});
    }
  ),
  on(CommentAction.setCommentsMarkError,
    ((state,{comment}) => {
      const comments = state.comments.map((item) => item._id === comment._id ? comment : item);
      return {...state, comments};
    })
  ),
  on(CommentAction.clearComments,
    (state) => {
    return ({...state, comments: []});
    }
    )
);
