export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
  }
}

