import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class Select2 extends PureComponent {
    render() {
        let { className, inputRef, ...attributes } = this.props;

        return (
            <Select
                className={`react-select ${className}`}
                classNamePrefix="react-select"
                ref={inputRef}
                {...attributes}
            />
        )
    }
}

Select2.defaultProps = {
    className: 'basic-single',
    isClearable: true,
    isSearchable: true,
    maxMenuHeight: 150
}

Select2.propTypes = {
    className: PropTypes.string,
    inputRef: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
    options: PropTypes.array.isRequired,
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
};

export default Select2;
