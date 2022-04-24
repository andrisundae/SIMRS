import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '28px',
    height: '28px',
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '28px',
    padding: '0 4px',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    marginTop: 0,
    marginBottom: 0,
    height: 27,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 2,
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '28px',
  }),
};
class Select2 extends PureComponent {
  render() {
    let { className, inputRef, ...attributes } = this.props;

    return (
      <Select
        className={`react-select ${className}`}
        classNamePrefix="react-select"
        ref={inputRef}
        styles={customStyles}
        {...attributes}
      />
    );
  }
}

Select2.defaultProps = {
  className: 'basic-single',
  isClearable: true,
  isSearchable: true,
  maxMenuHeight: 150,
};

Select2.propTypes = {
  className: PropTypes.string,
  inputRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  options: PropTypes.array.isRequired,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
};

export default Select2;
