import React from 'react';
import PropTypes from 'prop-types';
import MediaResponsive from 'react-responsive';
import { DatePicker } from 'antd';
import RangePickerMobile from './RangePickerMobile';

const { RangePicker } = DatePicker;

function UIRangePicker(props) {
  const { onChange, ...rest } = props;
  return (
    <React.Fragment>
      {/* desktop only */}
      <MediaResponsive minDeviceWidth={576}>
        <RangePicker
          onChange={onChange}
          {...rest}
        />
      </MediaResponsive>
      <MediaResponsive maxDeviceWidth={576}>
        {/* mobile version */}
        <RangePickerMobile
          onChange={onChange}
          {...rest}
        />
      </MediaResponsive>
    </React.Fragment>
  );
}

UIRangePicker.propType = {
  format: PropTypes.string,
  placeholder: PropTypes.array,
  onChange: PropTypes.func
};

UIRangePicker.defaultProps = {
  format: 'DD/MM/YYYY',
  placeholder: ['Từ', 'Đến'],
  onChange: () => {}
};

export default UIRangePicker;
