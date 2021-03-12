import {CommentI} from "../../modules/blog/models/app.comment.model";
import {ArticleI} from "../../modules/blog/models/app.article.model";


export const setMarkHelper = (state, id, mark, itemType) => {

  let newItem: CommentI | ArticleI;
  const newMark = mark.marks[0];
  const currentItem = state[itemType].find((item) => item._id === id);
  const turnoffMark = (currentItem.userState.isLikedByUser && newMark.rate === 1)
    || (currentItem.userState.isDislikedByUser && newMark.rate === -1);

  if (turnoffMark) {
    newItem = {
      ...currentItem,
      marks: [
        ...currentItem.marks.filter((item) => item.user !== newMark.user),
      ],
      userState: {
        isDislikedByUser: false,
        isLikedByUser: false
      }
    };
  } else {
    newItem = {
      ...currentItem,
      marks: [
        ...currentItem.marks.filter((item) => item.user !== newMark.user),
        newMark,
      ],
      userState: {
        isDislikedByUser: newMark.rate === -1,
        isLikedByUser: newMark.rate === 1
      }
    };
  }
  return newItem;
};
