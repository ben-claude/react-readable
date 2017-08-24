import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'

const SORT_BY_VOTE_SCORE = "byVoteScore"
const SORT_BY_TIMESTAMP = "byTimestamp"

const sortByVoteScore = (item1, item2) => {
  // higher voteScore first
  if (item1.voteScore > item2.voteScore) 
    return -1
  if (item1.voteScore < item2.voteScore) 
    return 1
  return 0
}

const sortByTimestamp = (item1, item2) => {
  // higher timestamp first
  if (item1.timestamp < item2.timestamp) 
    return -1
  if (item1.timestamp > item2.timestamp) 
    return 1
  return 0
}

class SortedList extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
  }
  state = {
    sortBy: SORT_BY_VOTE_SCORE,
  }
  onSortChange = (event) => {
    this.setState({ sortBy: event.target.value })
  }
  render() {
    let sortByFunc = null
    switch (this.state.sortBy) {
      case SORT_BY_VOTE_SCORE:
        sortByFunc = sortByVoteScore
        break
      case SORT_BY_TIMESTAMP:
        sortByFunc = sortByTimestamp
        break
      default:
        return <p>Unexpected sort by</p>
    }
    const sortedItems = this.props.items.sort(sortByFunc)
    return (
      <div>
        <div>
          <div>
            <h3>{this.props.label}</h3>
            <FormControl componentClass='select' onChange={this.onSortChange} value={this.state.sortBy}>
              <option value={SORT_BY_VOTE_SCORE}>By vote score</option>
              <option value={SORT_BY_TIMESTAMP}>By timestamp</option>
            </FormControl>
          </div>
          <div>
            <ul className='list-group'>
              {sortedItems.map((item, index) => (
                <li className='list-group-item' style={{border: 0}} key={index}>
                  {this.props.renderItem(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SortedList

