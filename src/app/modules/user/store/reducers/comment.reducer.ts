import {createReducer, on} from '@ngrx/store';
import * as CommentAction from '../actions/comments.actions';
import {CommentI} from "../../modules/blog/models/app.comment.model";

export interface CommentState {
  comments: CommentI[];
}

export const initialState: CommentState = {
  comments: [],
};

export const commentReducer = createReducer(
  initialState,
  on(CommentAction.setMark, (state, {id, mark}) => {
    const oneMark = mark.marks[0];
    const article = state.comments.find((item) => item._id === id);

    const newComment = {
      ...article,
      marks: [
        ...article.marks.filter((item) => item.user !== oneMark.user),
        oneMark,
      ]
    };

    return {
      ...state,
      articles: state.comments.map((item) => {
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
  on(CommentAction.setMarkSuccess,
    ((state,{comment}) => {
      const articles = state.comments.map((item) => item._id === comment._id ? comment : item);
      return {...state, articles};
    })
  )
);
