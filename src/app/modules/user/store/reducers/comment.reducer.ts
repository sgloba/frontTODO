import {createReducer, on} from '@ngrx/store';
import * as CommentAction from '../actions/comments.actions';
import {CommentI} from "../../modules/blog/models/app.comment.model";
import {setMarkHelper} from "../utils/store.utils";

export interface CommentState {
  comments: CommentI[];
  currentPage: number;
  hasNextPage: boolean;
  showReplyCommentsIds: string[];
}

export const initialState: CommentState = {
  comments: [],
  currentPage: 0,
  hasNextPage: false,
  showReplyCommentsIds: [],
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

      const stateCommentsIds = state.comments.map((item) => item._id);

      const newCommentsList = state.comments.map((comment) => {
        const newComment = comments.find((item) => item._id === comment._id);
        return newComment || comment;
      });

      console.log(
        'stateCommentsIds',stateCommentsIds,
        'newCommentsList', newCommentsList,
        'comments', comments

      )

      console.log('fetchSuccess',
        ({
          ...state,
          comments: [
            ...newCommentsList,
            ...comments.filter((comment) => !stateCommentsIds.includes(comment._id))
          ],
          hasNextPage
        })

        )

      return ({
        ...state,
        comments: [
          ...newCommentsList,
          ...comments.filter((comment) => !stateCommentsIds.includes(comment._id))
        ],
        hasNextPage
      });
    }
  ),
  on(CommentAction.onCommentCreated,
    (state, {comment}) => {
      console.log('on_comment_created',
        ({
          ...state,
          comments: [
            comment,
            ...state.comments
          ]
        })
        )
      return ({
        ...state,
        comments: [
          comment,
          ...state.comments
        ]
      });
    }
  ),
  on(CommentAction.setCommentsMarkError,
    ((state, {comment}) => {
      const comments = state.comments.map((item) => item._id === comment._id ? comment : item);
      return {...state, comments};
    })
  ),
  on(CommentAction.clearComments,
    (state) => {
      return ({...state, comments: [], hasNextPage: true, currentPage: 0})
    }
  ),
  on(CommentAction.addCommentPage,
    (state) => ({...state, currentPage: state.currentPage + 1})
  ),
  on(CommentAction.toggleShowReply,
    (state, {commentId}) => {

      console.log('REDUCER',
        {
        ...state,
        showReplyCommentsIds:
      state.showReplyCommentsIds.includes(commentId) ?
        state.showReplyCommentsIds.filter((id) => id !== commentId) :
        [...state.showReplyCommentsIds, commentId]
    }
        )
      return {
        ...state,
        showReplyCommentsIds:
          state.showReplyCommentsIds.includes(commentId) ?
            state.showReplyCommentsIds.filter((id) => id !== commentId) :
            [...state.showReplyCommentsIds, commentId]
      };
    }
  )
);
