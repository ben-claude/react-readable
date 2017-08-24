import React from 'react'
import PropTypes from 'prop-types'
import { createPost } from '../utils/api'
import PostForm from './PostForm'

const CreatePost = props => {
  const onSubmit = values => {
    createPost(values.title, values.body, values.author, values.category).then((newPost) => {
      props.onPostCreated(newPost)
    })
  }
  return <PostForm 
    categories={props.categories}
    submitPath={props.prevPath}
    onSubmit={onSubmit}
    />
}

CreatePost.propTypes = {
  categories: PropTypes.array.isRequired,
  onPostCreated: PropTypes.func.isRequired,
  prevPath: PropTypes.string.isRequired,
}

export default CreatePost

