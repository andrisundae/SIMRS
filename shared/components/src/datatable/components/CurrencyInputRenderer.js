import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { CurrencyInput } from '../../input';

class CurrencyInputRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this._handleCurrencyChange = this._handleCurrencyChange.bind(this);

        this.currencyInput = createRef();
    }

    _handleCurrencyChange(e, maskedValue, floatValue) {
        this.setState({ value: floatValue });
    }

    componentDidMount() {
        if (this.props.charPress) {
            this.setState({ value: this.props.charPress });
        }
    }

    render() {
        return (
            <CurrencyInput
                inputRef={this.currencyInput}
                value={this.state.value}
                onChangeEvent={this._handleCurrencyChange}
                fluid
            />
        );
    }

    afterGuiAttached() {
        this.currencyInput.current.theInput.focus();
        this.currencyInput.current.theInput.select();
    }

    getValue() {
        return this.state.value;
    }

    isCancelAfterEnd() {
        return this.props.value === this.getValue();
    }
}

CurrencyInputRenderer.propTypes = {
    value: PropTypes.number,
    data: PropTypes.object
}

export default CurrencyInputRenderer;