// TODO: implementasi capacitorjs

import './style';
import React from 'react';
import { render } from 'react-dom';
import App from './App.mobile';
import { Device } from '@capacitor/device';
// import { Plugins } from '@capacitor/core';

// const { App: CapApp } = Plugins;
// CapApp.addListener('appUrlOpen', (data) => {

// });

if ('' === window.location.search) {
  const location = window.location;
  if (!process.env.NODE_ENV || 'development' === process.env.NODE_ENV) {
    window.location = location + '?uuid=123&name=dev';
  } else {
    Device.getInfo().then((info) => {
      window.location = location + '?uuid=' + info.uuid + '&name=' + info.name;
    });
  }
}

render(<App />, document.getElementById('root'));
