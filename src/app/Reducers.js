import { combineReducers } from 'redux'
import { categories } from '../category/Reducer'
import { posts } from '../post/Reducer'
import { comments } from '../comment/Reducer'

export default combineReducers({
  posts,
  comments,
  categories,
}) 

