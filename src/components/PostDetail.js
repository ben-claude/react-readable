import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { addComment } from '../actions'
import { createComment } from '../utils/api'
import { Panel, ButtonToolbar, Button } from 'react-bootstrap'
import Post from './Post'
import Comment from './Comment'
import SortedList from './SortedList'
import CommentForm from './CommentForm'
import BackButton from './BackButton'

class PostDetail extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    prevPath: PropTypes.string.isRequired,
  }
  state = {
    modalOpen: false,
  }
  openModal = () => this.setState({ modalOpen: true })
  closeModal = () => this.setState({ modalOpen: false })
  render() {
    const { props } = this
    const { post } = props
    const renderComment = (comment) => (
      <Comment comment={comment}/>
    )
    return (
      <Panel>
        <BackButton />
        <Post post={post} prevPath={props.prevPath} details={true}/>
        <Panel>
          <SortedList label={`${post.comments.length} comments`} items={post.comments} renderItem={renderComment} />
          <ButtonToolbar>
            <Button block onClick={() => this.openModal()}>Add comment</Button>
          </ButtonToolbar>
        </Panel>

        <Modal
          className='comment-modal'
          overlayClassName='comment-modal-overlay'
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          <CommentForm
            onSubmit={(values) => {
              createComment(post.id, values.body, values.author).then((newComment) => {
                props.addComment(newComment)
              })
              this.closeModal()
            }}
          />
        </Modal>

      </Panel>
    )
  }
}

function mapStateToProps(storeState) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)

