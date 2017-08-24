import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, Button } from 'react-bootstrap'

function BackButton(props) {
  return (
    <Panel>
      <Button>
        <Link to='/'>Back</Link>
      </Button>
    </Panel>
  )
}

export default BackButton
