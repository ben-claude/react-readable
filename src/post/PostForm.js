import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import { Button, FormControl, FormGroup } from 'react-bootstrap'
import BackButton from '../components/BackButton'
import FormErrors from '../components/FormErrors'

class PostForm extends Component {
  static propTypes = {
    post: PropTypes.object, // not required
    categories: PropTypes.array.isRequired,
    submitPath: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    const { post } = props
    const defaultValid = post ? true : false
    this.state = {
      title: post ? post.title : '',
      body: post ? post.body : '',
      author: post ? post.author : '',
      category: post ? post.category.name : '',
      //
      fieldsValid: {
        title: defaultValid,
        body: defaultValid,
        author: defaultValid,
        category: defaultValid,
      },
      formErrors: {
        author: '',
        title: '',
        body: '',
        category: '',
      },
      formValid: false,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    // for form element's value to be included in the serialization, the element must have a 'name' attribute:
    const values = serializeForm(e.target, { hash: true })
    this.props.onSubmit(values)
    this.props.history.push(this.props.submitPath);
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
    const { title, body, author, category } = this.state.fieldsValid
    this.setState({
      formValid: title && body && author && category
    });
  }
  errorClass = error => (
    error.length === 0 ? '' : 'has-error'
  )
  render() {
    const { state } = this
    const { post } = this.props
    return (
      <div>
        <BackButton />
        <FormErrors errors={this.state.formErrors} />
        <form onSubmit={this.handleSubmit}>
          {/*
          api.js/modifyPost() only authorize to modify title and body
          programmatically hide HTML elements by using CSS 'display' property 
          */}
          <div style={{ display: post ? 'none' : 'initial' }}>
            <FormGroup className={this.errorClass(this.state.formErrors.category)}>
              <FormControl componentClass='select'
                name='category' 
                placeholder='Category'
                value={state.category}
                onChange={event => this.handleUserInput(event)}
              >
                <option key={0} value='' disabled>Category</option>
                {this.props.categories.map((category, index) => (
                  <option key={index + 1} value={category.name}>{category.name}</option>
                ))}
              </FormControl>
            </FormGroup>
            <FormGroup className={this.errorClass(this.state.formErrors.author)}>
              <FormControl type='text' name='author' placeholder='Author' value={state.author} onChange={event => this.handleUserInput(event)}/>
            </FormGroup>
          </div>
          <FormGroup className={this.errorClass(this.state.formErrors.title)}>
            <FormControl type='text' name='title' placeholder='Title' value={state.title} onChange={event => this.handleUserInput(event)}/>
          </FormGroup>
          <FormGroup className={this.errorClass(this.state.formErrors.body)}>
            <FormControl componentClass='textarea' name='body' placeholder='Body' value={state.body} onChange={event => this.handleUserInput(event)}/>
          </FormGroup>
          <Button
            type='submit'
            block
            disabled={!state.formValid}
          >
            {post ? 'Modify post' : 'Add post'}
          </Button>
        </form>
      </div>
    )
  }
}

export default withRouter(PostForm)

