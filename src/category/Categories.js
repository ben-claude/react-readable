import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Panel, FormControl } from 'react-bootstrap'

export const ALL_CATEGORY = 'all'

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
  }
  state = {
    category: this.props.category
  }
  render() {
    const allCategories = [ { name: ALL_CATEGORY, path: '/' } ].concat(this.props.categories.map(category => {
      return { 
        name: category.name,
        path: `/${category.path}`
      }
    }))
    const onChange = e => {
      const category = allCategories.filter(c => c.name === e.target.value)[0]
      this.setState({ category: category.name })
      this.props.history.push(category.path)
    }
    return (
      <Panel>
        <h3>Categories</h3>
        <FormControl componentClass='select' onChange={onChange} value={this.state.category}>
          {allCategories.map((category, index) => (
            <option key={index}>{category.name}</option>
          ))}
        </FormControl>
      </Panel>
    )
  }
}

export default withRouter(Categories)

