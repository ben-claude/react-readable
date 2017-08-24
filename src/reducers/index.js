import { combineReducers } from 'redux'
import {
  ADD_CATEGORIES,
  ADD_POSTS,
  ADD_POST,
  REMOVE_POST,
  ADD_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions'

// reducer1: categories array
function categories(state = [], action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

/*
reducer2: posts array
keep redux store "normalized" (for instance do not add comments as property into store.posts[i])
*/
function posts(state = [], action) {
  switch (action.type) {
    case ADD_POSTS:
      return action.posts // replace all the posts currently in the store
    case ADD_POST:
      return state.filter(p => p.id !== action.post.id).concat([ action.post ])
    case REMOVE_POST:
      return state.filter(p => p.id !== action.id)
    default:
      return state
  }
}

// reducer3: comments array
function comments(state = [], action) {
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

export default combineReducers({
  posts,
  comments,
  categories,
}) 

