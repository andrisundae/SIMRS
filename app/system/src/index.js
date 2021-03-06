import 'xel/themes/cupertino.css';
// import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-tree/assets/index.css';
import '@simrs/billing/src/static/css/tailwindcss.css';
import '@simrs/main/src/static/css/semantic.min.css';
import '@simrs/main/src/static/css/base.css';
import '@simrs/main/src/static/css/menubar.css';
import '@simrs/main/src/static/css/grid.css';

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
