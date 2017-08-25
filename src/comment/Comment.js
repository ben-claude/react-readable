import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import * as actions from './Actions'
import { modifyComment, deleteComment, updateCommentVoteScore } from '../utils/api'
import VoteScore from '../components/VoteScore'
import CommentForm from './CommentForm'
import { Panel, ButtonToolbar, Button, Well } from 'react-bootstrap'
import { epochToString } from '../utils/helper'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }
  state = {
    modalOpen: false,
  }
  openModal = () => this.setState({ modalOpen: true })
  closeModal = () => this.setState({ modalOpen: false })
  onVoteScoreUpdate = vote => {
    updateCommentVoteScore(this.props.comment.id, vote).then(modifiedComment => {
      this.props.addComment(modifiedComment)
    })
  }
  render() {
    const { comment } = this.props
    const panelHeader = (
      <h3>By {comment.author} on {epochToString(comment.timestamp)}</h3>
    )
    return (
      <Panel header={panelHeader} bsStyle='primary'>
        <div>
          <Well>{comment.body}</Well>
          <VoteScore score={comment.voteScore} onUpdate={this.onVoteScoreUpdate}/>
        </div>
        <div>
          <ButtonToolbar className='pull-right'>
            <Button onClick={() => this.openModal()}>Edit</Button>
            <Button
              onClick={() => {
                deleteComment(comment.id).then(response => {
                  if (response.status === 200) {
                    this.props.removeComment(comment.id)
                  }
                })
              }}
            >Delete</Button>
          </ButtonToolbar>

          <Modal
            className='comment-modal'
            overlayClassName='comment-modal-overlay'
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            contentLabel='Modal'
          >
            <CommentForm
              comment={comment}
              onSubmit={(values) => {
                modifyComment(comment.id, values.body).then((modifiedComment) => {
                  this.props.addComment(modifiedComment)
                })
                this.closeModal()
              }}
            />
          </Modal>
          
        </div>
      </Panel>
    )
  }
}

function mapStateToProps(storeState) {
  return {}
}

export default connect(mapStateToProps, actions)(Comment)

