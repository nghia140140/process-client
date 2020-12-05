import React, { Component } from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import { FieldStyle } from './styles';
import moment from 'moment';
import UtilDate from '~/views/utilities/helpers/UtilDate';
class DatePickerField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 date: this.props.value ? moment(this.props.value) : undefined
		};
	}
	handleSelect = date => {
		this.setState({ date });
		this.props.onChange(date);
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({ date: nextProps.value ? moment(nextProps.value) : undefined });
		}
	}
	render() {
		const {
			label,
			disabled,
			help,
			size,
			hasCustom,
			typeIcon,
			hasIconRight,
			placeholder,
			onBlur,
			validatestatus,
			iconEnd,
			iconStyle,
			defaultValue,
			required = false,
			disabledDate
		} = this.props;
		
		return (
			<FieldStyle
				label={label}
				size={size}
				validatestatus={validatestatus}
				help={help}
				required={required}
			>
				<DatePicker
					disabledTime={disabled}
					defaultValue={defaultValue}
					value={this.state.date} 
					onChange={this.handleSelect}
					disabledDate={disabledDate}
					onBlur={onBlur}
					format={UtilDate.formatDateLocal}
					suffixIcon={
						hasIconRight &&
						(hasCustom ? (
							// <UIIcon typeIcon={typeIcon} />
							null
						) : (
							// <Icon type={iconEnd} style={iconStyle} />
							null
						))
					}
					placeholder={placeholder}
				/>
			</FieldStyle>
		);
	}
}

DatePickerField.defaultProps = {
	disabled: false,
	hasIconRight: true,
	hasCustom: true,
	placeholder: 'username',
	iconStyle: { color: 'rgba(0, 0, 0, .25)' }
};

DatePickerField.propTypes = {
	label: PropTypes.string,
	size: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
};

export default DatePickerField;
