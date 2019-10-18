import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { CurrencyInput } from '../../input';

class NumericInputRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this._handleChange = this._handleChange.bind(this);

        this.numericInput = createRef();
    }

    _handleChange(e, maskedValue, floatValue) {
        this.setState({ value: floatValue });
    }

    render() {
        return (
            <CurrencyInput
                inputRef={this.numericInput}
                value={this.state.value}
                onChangeEvent={this._handleChange}
                decimalSeparator=""
                thousandSeparator=""
            />
        );
    }

    afterGuiAttached() {
        this.numericInput.current.theInput.focus();
        this.numericInput.current.theInput.select();
    }

    getValue() {
        return this.state.value;
    }
}

NumericInputRenderer.propTypes = {
    value: PropTypes.number,
    data: PropTypes.object
}

export default NumericInputRenderer;