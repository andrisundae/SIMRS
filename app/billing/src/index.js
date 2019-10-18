import 'semantic-ui-css/semantic.min.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "react-datepicker/dist/react-datepicker.css";

import '@simrs/main/src/static/css/base.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { i18n } from '@simrs/common';

import App from './App';

i18n
    .init({
        keySeparator: '~',
        defaultNS: 'common',
        ns: ['common'],
        debug: false,
    });

ReactDOM.render(<App />, document.getElementById('root'));
