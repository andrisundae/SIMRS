import _ from 'lodash';

const types = {
    REQUIRED: 'required',
    MINLENGTH: 'minlength',
    MAXLENGTH: 'maxlength',
    NUMBER: 'number',
    MAXNUMBER: "maxnumber"
}

const defaultMessage = {
    [types.REQUIRED]: 'harus diisi!',
    [types.MINLENGTH]: 'terlalu pendek!',
    [types.MAXLENGTH]: 'terlalu panjang!',
    [types.NUMBER]: 'harus angka!',
}

const checkRequired = (value) => {
    let isValid = false;
    if (_.isArray(value) || _.isObject(value)) {
        isValid = _.isEmpty(value) ? false : true;
    } else {
        isValid = value.toString().length > 0 ? true : false;
    }
    
    return isValid;
}

const checkMinLength = (value, min) => {
    let isValid = value.toString().length >= min ? true : false;

    return isValid;
}

const checkMaxLength = (value, max) => {
    let isValid = value.toString().length <= max ? true : false;

    return isValid;
}

const checkNumber = (value) => {
    let isValid = _.isNumber(value);

    return isValid;
}

const checkMaxNumber = (value, max) => {
    let isValid = _.isNumber(value);

    if (isValid) {
        isValid = value <= max ? true : false;
    }

    return isValid;
}

/* 
    values: {
        username: '',
        password: ''
    }
    rules : {
        username: {
            required: true,
            minlength: 4
        }
    }
    messages: {
        username: {
            required: 'Username harus diisi!',
            minlength: 'Minimal jumlah karakter 4!'
        }
    }
*/

export const getFirstError = (errors) => {
    if (_.isEmpty(errors)) {
        return 'Tidak ada pesan error'
    } else {
        if (_.isString(_.first(errors))) {
            return _.first(errors);
        } else {
            return _.first(errors[Object.keys(errors)[0]]);
        }
    }
}

export const getFirstElementError = (errors) => {
    if (_.isEmpty(errors)) {
        return ''
    } else {
        return Object.keys(errors)[0];
    }
}

export default (values, rules, messages) => {
    let errors = {};

    Object.keys(rules).forEach(function (field) {
        let value = '';
        if (typeof values[field] !== 'undefined' && values[field] !== null) {
            value = values[field];
        }
        let fieldMessages = messages[field] ? messages[field] : {};
        let error = [];

        Object.keys(rules[field]).forEach(function (rule) {
            let ruleMessage = fieldMessages[rule] ? fieldMessages[rule] : field + ' ' + defaultMessage[rule];
            let ruleValue = rules[field][rule];
            let isValid = false;

            switch (rule) {
                case types.REQUIRED:
                    if (ruleValue === true) {
                        isValid = checkRequired(value);
                    }
                    break;
                case types.MINLENGTH:
                    isValid = checkMinLength(value, ruleValue);
                    break;
                case types.MAXLENGTH:
                    isValid = checkMaxLength(value, ruleValue);
                    break;
                case types.NUMBER:
                    isValid = checkNumber(value);
                    break;
                case types.MAXNUMBER:
                    isValid = checkMaxNumber(value, ruleValue);
                    break;
                default:
                    break;
            }

            if (!isValid) {
                error.push(ruleMessage);
            }

        }, this);

        if (error.length > 0) {
            errors[field] = error;
        }
    }, this);

    return errors;

}
