import {
  ADD_POSTS,
  ADD_POST,
  REMOVE_POST,
} from './Actions'

/*
reducer2: posts array
keep redux store "normalized" (for instance do not add comments as property into store.posts[i])
*/
export function posts(state = [], action) {
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

