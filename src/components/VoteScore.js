import React from 'react'
import PropTypes from 'prop-types'
import { UP_VOTE, DOWN_VOTE } from '../utils/api'
import { Panel, ButtonGroup, Button } from 'react-bootstrap'

const VoteScore = props => {
  const increment = () => props.onUpdate(UP_VOTE)
  const decrement = () => props.onUpdate(DOWN_VOTE)
  return (
    <Panel style={{border: 0}}>
      <ButtonGroup>
        <Button bsSize='xsmall' block onClick={increment}>Vote up</Button>
        <Button bsSize='xsmall' block disabled>{props.score}</Button>
        <Button bsSize='xsmall' block onClick={decrement}>Vote down</Button>
      </ButtonGroup>
    </Panel>
  )
}

VoteScore.propTypes = {
  score: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default VoteScore

