import React from 'react'
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { TextAreaFieldStyle } from "./styles";
const { TextArea  } = Input;

const TextAreaField = (props) => {
  const { rows, label, ...rest } = props;
  return (
    <TextAreaFieldStyle
      label={label}
    >
      <TextArea 
        rows={rows}
        {...rest}
      />
    </TextAreaFieldStyle>
  )
}

TextAreaField.defaultProps = {
  rows: 6
}

TextAreaField.propTypes = {
  rows: PropTypes.number
}

export default TextAreaField
