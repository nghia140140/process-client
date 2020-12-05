import React, { PureComponent } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { SelectStyle } from './styles';
import { getArray } from '~/views/utilities/helpers/utilObject';

const Option = Select.Option;

export default class SelectField extends PureComponent {
  render() {
    const {
      label,
      help,
      data,
      size,
      onChange,
      className,
      onBlur,
      validatestatus,
      iconEnd,
      iconStyle,
      inputStyle,
      gutterbottom,
      placeholder,
      labelCol,
      wrapperCol,
      mode,
      value,
      required = false,
      ...rest
    } = this.props;
    
    return (
      <SelectStyle
        label={label}
        size={size}
        required={required}
        className={className}
        hasFeedback
        validatestatus={validatestatus}
        help={help}
        gutterbottom={gutterbottom}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Select
          style={inputStyle}
          onChange={onChange}
          onBlur={onBlur}
          allowClear
          placeholder={placeholder}
          mode={mode}
          value={ getArray(data, undefined, []).length > 0 ? value: undefined}
          // {...rest}
        >
          {data &&
            data.map(item => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
        </Select>
      </SelectStyle>
    );
  }
}

SelectField.defaultProps = {
  disabled: false,
  placeholder: '',
  defaultValue: '',
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  // gutterbottom: true,
  mode: 'default'
};

SelectField.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  data: PropTypes.array,
  gutterbottom: PropTypes.bool
};
