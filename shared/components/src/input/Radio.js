import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Radio extends PureComponent {
    render() {
        let { className, inputRef, label, ...attributes } = this.props;

        return (
            <div className={`ui radio checkbox ${className}`}>
                <input ref={inputRef}  {...attributes} />
                <label>{label}</label>
            </div>
        )
    }
}

Radio.defaultProps = {
    type: 'radio',
    className: ''
}

Radio.propTypes = {
    className: PropTypes.string,
    inputRef: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
    label: PropTypes.string,
};

export default Radio;
