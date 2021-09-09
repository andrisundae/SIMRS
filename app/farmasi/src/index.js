import './style';

import React from 'react';
import ReactDOM from 'react-dom';
import { i18n } from '@simrs/common';

import App from './App';

i18n.init({
  keySeparator: '~',
  defaultNS: 'common',
  ns: ['common'],
  debug: false,
});

ReactDOM.render(<App />, document.getElementById('root'));
