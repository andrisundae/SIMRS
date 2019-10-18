import 'semantic-ui-css/semantic.min.css'
import './static/css/main-page.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {i18n} from '@simrs/common';

i18n
    .init({
    keySeparator: '~',
    defaultNS: 'main',
    ns: ['main']
});

ReactDOM.render(<App />, document.getElementById('root'));
