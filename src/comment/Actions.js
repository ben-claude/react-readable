export const ADD_COMMENTS = 'ADD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function removeComment(id) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

