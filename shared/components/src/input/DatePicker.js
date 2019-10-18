import React, { PureComponent } from 'react';
import ReactDatePicker, {registerLocale} from "react-datepicker";

import { localeId } from '@simrs/common';

class DatePicker extends PureComponent {
    render() {
        const { inputRef, ...attributes } = this.props;

        return (
            <ReactDatePicker ref={inputRef} locale="id" {...attributes}/>
        )
    }

    componentDidMount() {
        registerLocale('id', localeId);
    }
}

export default DatePicker;
