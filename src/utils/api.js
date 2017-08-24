import uuidv4 from 'uuid/v4'

const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:5001'

let token = localStorage.token

// token is stored in localStorage so it is not lost when the page is refreshed in the browser
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  /*
  from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  fetch(): returns a promise containing the response (a Response object).
  */
  fetch(`${api}/categories`, { headers })
    .then(response => (
      /*
      from https://developer.mozilla.org/en-US/docs/Web/API/Response
      Response implements Body, so it has the following property available to it:
      Body.json(): Takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON.
      */
      response.json()
    ))
    .then(data => (
      /*
      $ curl -X GET -H "Authorization: 12345" http://localhost:5001/categories
      {"categories": [
        {"name":"react","path":"react"},
        {"name":"redux","path":"redux"},
        {"name":"udacity","path":"udacity"}
      ]}
      */
      data.categories
    ))

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(response => (
      /*
      $ curl -X GET -H "Authorization: 12345" http://localhost:5001/posts
      [
        {
          "id":"8xf0y6ziyjabvozdd253nd",
          "timestamp":1467166872634,
          "title":"Udacity is the best place to learn React",
          "body":"Everyone says so after all.",
          "author":"thingtwo",
          "category":"react",
          "voteScore":6,
          "deleted":false
        },
        ...
      ]
      */
      response.json()
    ))


export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(response => (
      /*
      $ curl -X GET -H "Authorization: 12345" http://localhost:5001/posts/8xf0y6ziyjabvozdd253nd/comments
      [
        {
          "id":"894tuq4ut84ut8v4t8wun89g",
          "parentId":"8xf0y6ziyjabvozdd253nd",
          "timestamp":1468166872634,
          "body":"Hi there! I am a COMMENT.",
          "author":"thingtwo",
          "voteScore":6,
          "deleted":false,
          "parentDeleted":false
        },
        ...
      ]
      */
      response.json()
    ))

export const createPost = (title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
    })
  }).then(response => response.json())

export const modifyPost = (id, title, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body,
    })
  }).then(response => response.json())

export const deletePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers
  })

export const createComment = (parentId, body, author) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: uuidv4(),
      timestamp: Date.now(),
      body,
      author,
      parentId,
    })
  }).then(response => response.json())

export const modifyComment = (id, body) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      timestamp: Date.now(),
      body,
    })
  }).then(response => response.json())

export const deleteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers
  })

export const UP_VOTE = 'upVote'
export const DOWN_VOTE = 'downVote'

const updateVotescore = (path, id, vote) => {
  return fetch(`${api}/${path}/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: vote // UP_VOTE or DOWN_VOTE
    })
  }).then(response => response.json())
}

export const updatePostVoteScore = (postId, vote) =>
  updateVotescore('posts', postId, vote)

export const updateCommentVoteScore = (commentId, vote) =>
  updateVotescore('comments', commentId, vote)

