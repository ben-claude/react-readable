export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POSTS = 'ADD_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_COMMENTS = 'ADD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function addCategories(categories) {
  return {
    type: ADD_CATEGORIES,
    categories,
  }
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    id
  }
}

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

