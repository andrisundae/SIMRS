import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactCurrencyInput from "react-currency-input";
import classNames from 'classname';

class CurrencyInput extends PureComponent {
    render() {
        let { fluid, disabled, readOnly, className, inputRef, ...attributes } = this.props;

        className = classNames('ui input ' + className, {
            'disabled': disabled,
            'readonly': readOnly,
            'fluid': fluid,
        })

        return (
            <div className={className}>
                <ReactCurrencyInput
                    ref={inputRef}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...attributes}
                />
            </div>
        )
    }
}

CurrencyInput.defaultProps = {
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 0,
    disabled: false,
    readOnly: false,
    fluid: false,
};

CurrencyInput.propTypes = {
    precision: PropTypes.number,
    className: PropTypes.string,
    decimalSeparator: PropTypes.string,
    thousandSeparator: PropTypes.string,
    inputRef: PropTypes.object,
    disabled: PropTypes.bool,
    fluid: PropTypes.bool,
    readOnly: PropTypes.bool,
};

export default CurrencyInput;
