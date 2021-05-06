import React, { useState, useEffect } from 'react';
import ReactDatePicker, {
  registerLocale,
  CalendarContainer,
} from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import _ from 'lodash';
import { Icon, Button } from 'semantic-ui-react';

export function checkedIcon(value, color = '') {
  if (color == '') {
    color = 'black';
  }
  if (value === 1) return <Icon name="check" color={color} />;
  else if (value === 2) return <Icon name="check" color="red" />;
  else return null;
}

export const DatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const years = _.range(1990, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <ReactDatePicker
      {...props}
      popperClassName="z-20"
      calendarContainer={({ className, children }) => {
        return (
          <CalendarContainer
            className={className + (props.withPortal ? ' text-lg' : ' ')}
          >
            <div className="react-datepicker__triangle left-24"></div>
            <div style={{ position: 'relative' }}>{children}</div>
          </CalendarContainer>
        );
      }}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            className="py-1 px-3 border border-gray-300 font-bold"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {'<'}
          </button>
          <select
            className="p-0"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="p-0"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="py-1 px-3 border border-gray-300 font-bold"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {'>'}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};
