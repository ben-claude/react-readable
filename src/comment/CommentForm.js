import React, { Component } from 'react'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import { Button, FormControl, FormGroup } from 'react-bootstrap'
import FormErrors from '../components/FormErrors'

class CommentForm extends Component {
  static propTypes = {
    comment: PropTypes.object, // not required
    onSubmit: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    const { comment } = props
    const defaultValid = comment ? true : false
    this.state = {
      body: comment ? comment.body : '',
      author: comment ? comment.author : '',
      fieldsValid: {
        body: defaultValid,
        author: defaultValid,
      },
      formErrors: {
        author: '',
        body: '',
      },
      formValid: false,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    // for form element's value to be included in the serialization, the element must have a 'name' attribute:
    const values = serializeForm(e.target, { hash: true })
    this.props.onSubmit(values)
  }
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }
  validateField = (name, value) => {
    this.setState((state) => {
      const fieldsValid = state.fieldsValid
      const formErrors = state.formErrors
      const valid = value.length > 0
      return {
        fieldsValid: {
          ...fieldsValid,
          [name]: valid,
        },
        formErrors: {
          ...formErrors,
          [name]: valid ? '' : ' is mandatory',
        },
      }
    }, this.validateForm);
  }
  validateForm = () => {
    const { body, author } = this.state.fieldsValid
    this.setState({
      formValid: body && author
    });
  }
  errorClass = error => (
    error.length === 0 ? '' : 'has-error'
  )
  render() {
    const { state } = this
    const { comment } = this.props
    return (
      <div>
        <FormErrors errors={this.state.formErrors} />
        <form onSubmit={this.handleSubmit}>
          {/*
          api.js/modifyComment() only authorize to modify body
          so programmatically hide HTML elements by using CSS 'display' property 
          */}
          <div style={{ display: comment ? 'none' : 'initial' }}>
            <FormGroup className={this.errorClass(this.state.formErrors.author)}>
              <FormControl type='text' name='author' placeholder='Author' value={state.author} onChange={event => this.handleUserInput(event)}/>
            </FormGroup>
          </div>
          <FormGroup className={this.errorClass(this.state.formErrors.body)}>
            <FormControl componentClass='textarea' name='body' placeholder='Body' value={state.body} onChange={event => this.handleUserInput(event)}/>
          </FormGroup>
          <div>
            <Button
              type='submit'
              disabled={!state.formValid}
            >
              {comment ? 'Modify comment' : 'Add comment'}
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CommentForm

