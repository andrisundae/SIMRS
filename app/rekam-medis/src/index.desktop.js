import './style';
import React from 'react';
import { render } from 'react-dom';
import { i18n } from '@simrs/common';
import App from './App.desktop';

i18n.init({
  keySeparator: '~',
  defaultNS: 'common',
  ns: ['common'],
  debug: false,
});

render(<App />, document.getElementById('root'));
