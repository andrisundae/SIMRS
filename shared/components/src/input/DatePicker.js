import React, { PureComponent } from 'react';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import { id as localeId } from '@simrs/common/src/utils/locale';

class DatePicker extends PureComponent {
  render() {
    const { inputRef, ...attributes } = this.props;
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

    const nextPrevCssButton = {
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      borderWidth: '1px',
      borderColor: 'rgba(107, 114, 128, 1)',
      fontWeight: 'bold',
    };

    return (
      <ReactDatePicker
        ref={inputRef}
        {...attributes}
        locale={localeId}
        popperClassName="z-20"
        calendarContainer={({ className, children }) => {
          return (
            <CalendarContainer
              className={className}
              style={{
                fontSize: this.props?.withPortal
                  ? '1.125rem !important'
                  : '1rem',
                lineHeight: this.props?.withPortal
                  ? '1.75rem !important'
                  : '1.5rem',
              }}
            >
              <div
                className="react-datepicker__triangle"
                style={{
                  left: '6rem',
                }}
              ></div>
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
              style={nextPrevCssButton}
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {'<'}
            </button>
            <select
              style={{
                cursor: 'pointer',
                padding: 0,
              }}
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
              style={{
                cursor: 'pointer',
                padding: 0,
              }}
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
              style={nextPrevCssButton}
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              {'>'}
            </button>
          </div>
        )}
      />
    );
  }
}

export default DatePicker;
