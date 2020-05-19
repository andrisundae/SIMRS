// import {isValid, format} from 'date-fns';
// import id from 'date-fns/locale/id';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import numeral from 'numeral';
import _ from 'lodash';

(function () {
  numeral.register('locale', 'id', {
    delimiters: {
      thousands: '.',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'r',
      million: 'j',
      billion: 'm',
      trillion: 't',
    },
    currency: {
      symbol: 'Rp ',
    },
  });

  numeral.locale('id');
  dayjs.locale('id');
})();

export const dateFormatDB = (date, format = 'YYYY-MM-DD HH:mm') => {
  const newDate = dayjs(date);

  return newDate.isValid() ? newDate.format(format) : date;
};

export const dateFormatClient = (date, format = 'DD MMMM YYYY HH:mm') => {
  const newDate = dayjs(date);

  return newDate.isValid() ? newDate.format(format) : date;
};

export const currency = (nominal, format = '(0,0.00)') => {
  nominal = _.replace(nominal.toString(), '.', ',');
  return numeral(nominal).format(format);
};

export const numFormatDb = (nominal) => {
  return parseFloat(_.replace(nominal, ',', '.'));
};

export const textSplitter = (text, splitter = '.', len = 2) => {
  text = text.toString();

  if (!text) {
    return '';
  }

  const split = text.match(/.{1,2}/g);
  if (!split) {
    return '';
  }
  const joinText = split.join(splitter);

  return joinText;
};
