import React from 'react';
import PropTypes from 'prop-types'

const FormErrors = props =>
  <div>
    {Object.keys(props.errors).map((fieldName, i) => {
      if (props.errors[fieldName].length > 0) {
        return (
          <p key={i}>{fieldName} {props.errors[fieldName]}</p>
        )        
      } else {
        return ''
      }
    })}
  </div>

FormErrors.propTypes = {
  errors: PropTypes.object.isRequired,
}

export default FormErrors

