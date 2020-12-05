import React, { PureComponent } from 'react';
import {  Input } from 'antd';
import PropTypes from 'prop-types';
import { FieldStyle } from './styles';
import {
  EyeOutlined,
  EyeInvisibleOutlined 
} from '@ant-design/icons'

export default class InputField extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      hiddenPassword: false
    }
  }
  render() {
    const {
      iconStart,
      iconEnd,
      label,
      name,
      type,
      disabled,
      value,
      help,
      size,
      placeholder,
      onBlur,
      onChange,
      validatestatus,
      iconStyle,
      inputStyle,
      labelCol,
      autoComplete,
      wrapperCol,
      addonAfter,
      required = false,
      ...rest
    } = this.props;

    const getIcon=(iconType)=>{
      switch(iconType){
        case 'password': return !this.state.hiddenPassword ? <EyeOutlined onClick={()=>{this.setState({hiddenPassword: !this.state.hiddenPassword})}} /> :  <EyeInvisibleOutlined onClick={()=>{this.setState({hiddenPassword: !this.state.hiddenPassword})}} />
      }
    }

    return (
      <FieldStyle
        label={label}
        size={size}
        validatestatus={validatestatus}
        help={help}
        required={required}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Input
          name={name}
          value={value}
          type={type === 'password' && this.state.hiddenPassword ? '' : type }
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={'new-password'}
          disabled={disabled}
          // prefix={getIcon(iconStart)}
          suffix={getIcon(iconEnd)}
          placeholder={placeholder}
          style={inputStyle}
          addonAfter={addonAfter}
          {...rest}
        />
      </FieldStyle>
    );
  }
}

InputField.defaultProps = {
  hasIconLeft: false,
  hasIconRight: true,
  hasCustom: true,
  disabled: false,
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  iconEnd: 'user',
  iconStart: 'user',
  type: 'text',
  placeholder: '',
  autoComplete: 'off'
};

InputField.propTypes = {
  iconStart: PropTypes.string,
  iconEnd: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.array,
  hasIconLeft: PropTypes.bool,
  hasIconRight: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  inputStyle: PropTypes.object,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string
};
