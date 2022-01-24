import React from 'react';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
// import { Button, Icon, Select } from 'semantic-ui-react';
// import { getMonth, getYear } from 'date-fns';
// import _ from 'lodash';
import { id as localeId } from '@simrs/common/src/utils/locale';

// const years = _.range(1990, getYear(new Date()) + 1, 1);
// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

// const nextPrevCssButton = {
//   paddingTop: '0.25rem',
//   paddingBottom: '0.25rem',
//   paddingLeft: '0.75rem',
//   paddingRight: '0.75rem',
//   borderWidth: '1px',
//   borderColor: 'rgba(107, 114, 128, 1)',
//   fontWeight: 'bold',
// };
const DatePicker = ({ inputRef, withPortal, ...attributes }) => {
  return (
    <ReactDatePicker
      ref={inputRef}
      {...attributes}
      locale={localeId}
      popperClassName="z-50"
      calendarContainer={({ className, children }) => {
        return (
          <CalendarContainer
            className={className}
            style={{
              fontSize: withPortal ? '1.125rem !important' : '1rem',
              lineHeight: withPortal ? '1.75rem !important' : '1.5rem',
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
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      // renderCustomHeader={({
      //   date,
      //   changeYear,
      //   changeMonth,
      //   decreaseMonth,
      //   increaseMonth,
      //   prevMonthButtonDisabled,
      //   nextMonthButtonDisabled,
      // }) => (
      //   <div
      //     style={{
      //       margin: 10,
      //       display: 'flex',
      //       justifyContent: 'center',
      //     }}
      //   >
      //     {/* <button
      //       style={nextPrevCssButton}
      //       onClick={decreaseMonth}
      //       disabled={prevMonthButtonDisabled}
      //       type="button"
      //     >
      //       {'<'}
      //     </button> */}
      //     <Button
      //       type="button"
      //       icon
      //       size="small"
      //       onClick={decreaseMonth}
      //       disabled={prevMonthButtonDisabled}
      //     >
      //       <Icon name="angle left" />
      //     </Button>
      //     <Select options={countryOptions} />
      //     <select
      //       style={{
      //         cursor: 'pointer',
      //         padding: 0,
      //       }}
      //       value={getYear(date)}
      //       onChange={({ target: { value } }) => changeYear(value)}
      //     >
      //       {years.map((option) => (
      //         <option key={option} value={option}>
      //           {option}
      //         </option>
      //       ))}
      //     </select>

      //     <select
      //       style={{
      //         cursor: 'pointer',
      //         padding: 0,
      //       }}
      //       value={months[getMonth(date)]}
      //       onChange={({ target: { value } }) =>
      //         changeMonth(months.indexOf(value))
      //       }
      //     >
      //       {months.map((option) => (
      //         <option key={option} value={option}>
      //           {option}
      //         </option>
      //       ))}
      //     </select>
      //     <Button
      //       type="button"
      //       icon
      //       size="small"
      //       onClick={increaseMonth}
      //       disabled={nextMonthButtonDisabled}
      //     >
      //       <Icon name="angle right" />
      //     </Button>
      //     {/* <button
      //       style={nextPrevCssButton}
      //       onClick={increaseMonth}
      //       disabled={nextMonthButtonDisabled}
      //       type="button"
      //     >
      //       {'>'}
      //     </button> */}
      //   </div>
      // )}
    />
  );
};

export default DatePicker;
