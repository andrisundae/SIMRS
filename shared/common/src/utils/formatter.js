import {isValid, format} from 'date-fns';
import id from 'date-fns/locale/id';
import numeral from 'numeral';
import _ from 'lodash';

(function () {
    numeral.register('locale', 'id', {
        delimiters: {
            thousands: ".",
            decimal: ","
        },
        abbreviations: {
            thousand: "r",
            million: "j",
            billion: "m",
            trillion: "t"
        },
        currency: {
            symbol: "Rp "
        }
    });

    numeral.locale("id");
})();

export const dateFormatDB = (date, formatStr = "YYYY-MM-DD HH:mm") => {
    date = new Date(date);
    if (isValid(date)) {
        return format(date, formatStr);
    } else {
        return date;
    }
}

export const dateFormatClient = (date, formatStr = "DD MMMM YYYY HH:mm") => {
    date = new Date(date);
    if (isValid(date)) {
        return format(date, formatStr, {locale: id});
    } else {
        return date;
    }
}

export const currency = (nominal, format = "(0,0.00)") => {
    nominal = _.replace(nominal.toString(), '.', ',');
    return numeral(nominal).format(format);
}

export const numFormatDb = (nominal) => {
    return parseFloat(_.replace(nominal, ',', '.'));
}

export const textSplitter = (text, splitter='.', len= 2) => {
    text = text.toString();
    
    if (!text) {
        return ''
    }

    const split = text.match(/.{1,2}/g);
    if (!split) {
        return ''
    }
    const joinText = split.join(splitter);

    return joinText;
}