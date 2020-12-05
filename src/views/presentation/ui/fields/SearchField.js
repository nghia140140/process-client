import React, { PureComponent } from "react";
import { Icon, Select, Input } from "antd";
import PropTypes from "prop-types";
import { SelectStyle } from "./styles";

const Option = Select.Option;

export default class SearchField extends PureComponent {
  constructor(props){
    super(props)
    const {initialValue} = props;
    this.state = {
      value: initialValue
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.value !== nextProps.initialValue){
      this.setState({value: nextProps.initialValue})
    }
  }

  render() {
    const {
      label,
      help,
      data,
      size,
      onChange,
      onChangeText,
      onSearchValue,
      className,
      onBlur,
      validatestatus,
      iconEnd,
      iconStyle,
      inputStyle={},
      gutterbottom,
      labelCol,
      wrapperCol,
      mode,
      ...rest
    } = this.props;

    let { placeholder } = this.props;
    const { Search } = Input;

    if (typeof placeholder === "undefined") placeholder = "input search text";
    return (
      <SelectStyle
        label={label}
        size={size}
        className={className}
        hasFeedback
        validatestatus={validatestatus}
        help={help}
        gutterbottom={gutterbottom}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        mode={mode}
      >
        <Search
          placeholder={placeholder}
          value={this.state.value}
          onChange={e => {
            this.setState({value: e.target.value})
            onChange && onChange(e)
            onChangeText && onChangeText(e.target.value)
          }}
          onKeyDown={e => {
            if (
              e.keyCode === 13 &&
              onSearchValue &&
              onSearchValue(e.target.value)
            ) {
            }
          }}
          style={{ width: "100%" , ...inputStyle }}
        />
      </SelectStyle>
    );
  }
}

SearchField.defaultProps = {
  disabled: false,
  placeholder: "",
  defaultValue: "",
  iconStyle: { color: "rgba(0,0,0,.25)" },
  gutterbottom: true,
  mode: "default"
};

SearchField.propTypes = {
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
