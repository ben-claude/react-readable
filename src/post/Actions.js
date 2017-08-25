export const ADD_POSTS = 'ADD_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

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

