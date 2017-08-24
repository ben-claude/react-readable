import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import VoteScore from './VoteScore'
import { epochToString } from '../utils/helper'
import { deletePost, updatePostVoteScore } from '../utils/api'
import { removePost, addPost } from '../actions'
import { Panel, ButtonToolbar, Button, Well } from 'react-bootstrap'

const Post = props => {
  const { post } = props
  const panelHeader = (
    <h3>{post.title}</h3>
  )
  const commentsNumber = `${post.comments.length} comments`
  const footer = `By ${post.author} on ${epochToString(post.timestamp)}`
  return (
    <Panel header={panelHeader} footer={footer} bsStyle='primary'>
      <div>
        <Well>{post.body}</Well>
        {!props.details && (
          <Button bsStyle="link" block>
            <Link to={`/view/posts/${post.id}`}>{commentsNumber}</Link>
          </Button>
        )}
        <VoteScore
          score={post.voteScore}
          onUpdate={vote => {
            updatePostVoteScore(post.id, vote).then(modifiedPost => {
              props.addPost(modifiedPost)
            })
          }}
        >
        </VoteScore>
      </div>
      <div>
        <ButtonToolbar className='pull-right'>
          <Button
            onClick={() => props.history.push({
              pathname: `/edit/posts/${post.id}`,
              state: { prevPath: props.prevPath },
            })}
          >Edit</Button>
          <Button
            onClick={() => {
              deletePost(post.id).then(response => {
                if (response.status === 200) {
                  props.removePost(post.id)
                }
              })
              props.history.push('/')
            }}
          >Delete</Button>
        </ButtonToolbar>
      </div>
    </Panel>
  )
}

function mapStateToProps(storeState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    removePost: (data) => dispatch(removePost(data)),
    addPost: (data) => dispatch(addPost(data)),
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  prevPath: PropTypes.string.isRequired,
  details: PropTypes.bool.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))

