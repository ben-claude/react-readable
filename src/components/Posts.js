import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Panel, ButtonToolbar, Button } from 'react-bootstrap'
import Post from './Post'
import SortedList from './SortedList'
import Categories from './Categories'

const Posts = props => {
  const renderPost = (post) => (
    <Post post={post} prevPath={props.prevPath} details={false}/>
  )
  return (
    <Panel>
      <Categories categories={props.categories} category={props.category}/>
      <Panel>
        <SortedList label='Posts' items={props.posts} renderItem={renderPost} />
        <ButtonToolbar>
          <Button block onClick={() => props.history.push({
            pathname: '/create/posts',
            state: { prevPath: props.prevPath },
          })}
        >Add post</Button>
        </ButtonToolbar>
      </Panel>
    </Panel>
  )
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  prevPath: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
}

export default withRouter(Posts)

