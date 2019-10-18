import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends PureComponent {
    render() {
        let { className, inputRef, label, ...attributes } = this.props;

        return (
            <div className={`ui checkbox ${className}`}>
                <input ref={inputRef} {...attributes} />
                <label>{label}</label>
            </div>
        )
    }
}

Checkbox.defaultProps = {
    type: 'checkbox',
    className: ''
}

Checkbox.propTypes = {
    className: PropTypes.string,
    inputRef: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
    label: PropTypes.string,
};

export default Checkbox;
