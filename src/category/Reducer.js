import {
  ADD_CATEGORIES,
} from './Actions'

// reducer1: categories array
export function categories(state = [], action) {
  switch (action.type) {
    case ADD_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

