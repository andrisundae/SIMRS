import './style';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { i18n } from '@simrs/common';

import App from './App';

i18n.init({
  keySeparator: '~',
  defaultNS: 'common',
  ns: ['common'],
  debug: false,
});

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<App />);
