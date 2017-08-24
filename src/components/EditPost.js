import React from 'react'
import PropTypes from 'prop-types'
import { modifyPost } from '../utils/api'
import PostForm from './PostForm'

const EditPost = props => {
  const onSubmit = values => {
    modifyPost(props.post.id, values.title, values.body).then((modifiedPost) => {
      props.onPostModified(modifiedPost)
    })
  }
  return <PostForm 
    post={props.post}
    categories={props.categories}
    submitPath={props.prevPath}
    onSubmit={onSubmit}
    />
}

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onPostModified: PropTypes.func.isRequired,
  prevPath: PropTypes.string.isRequired,
}

export default EditPost

