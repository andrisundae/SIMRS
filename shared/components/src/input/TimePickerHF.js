import React from 'react';
import DatePickerHF from './DatePickerHF';

const TimePickerHF = ({
  showTimeSelect = true,
  timeFormat = 'HH:mm',
  showTimeSelectOnly = true,
  timeIntervals = 15,
  dateFormat = 'HH:mm',
  timeCaption = 'Jam',
  ...props
}) => {
  return (
    <DatePickerHF
      dateFormat={dateFormat}
      showTimeSelect={showTimeSelect}
      timeFormat={timeFormat}
      showTimeSelectOnly={showTimeSelectOnly}
      timeIntervals={timeIntervals}
      timeCaption={timeCaption}
      {...props}
    />
  );
};

export default TimePickerHF;
