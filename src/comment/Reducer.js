import {
  ADD_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './Actions'

// reducer3: comments array
export function comments(state = [], action) {
  switch (action.type) {
    case ADD_COMMENTS: {
      // do not remove from the store the comments with ids not in action.comments
      const exists = (comments, comment) => (
        comments.filter(c => c.id === comment.id).length ? true : false
      )
      return state.filter(c => !exists(action.comments, c)).concat(action.comments)
    }
    case ADD_COMMENT:
      return state.filter(c => c.id !== action.comment.id).concat([ action.comment ])
    case REMOVE_COMMENT:
      return state.filter(c => c.id !== action.id)
    default:
      return state
  }
}

