import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-fetch-backend';
import { simrsHeaders } from './request';
import { main } from '../store';
import { isDesktop } from '../helpers/deviceDetector';

const fetch = new Backend(null, {
  loadPath: (lngs, namespace) => {
    return `${main.get('config.api')}/translation/${lngs}/${namespace}`;
  },
  stringify: JSON.stringify,
  allowMultiLoading: false,
  multiSeparator: '+',
  requestOptions: {
    mode: 'cors',
    cache: 'no-cache',
    headers: simrsHeaders(),
  },
  // parse: (data) => {
  //   const parseData = JSON.parse(data);

  //   return parseData.data;
  // },
});

i18n.use(fetch).use(initReactI18next);
if (isDesktop) {
  const LanguageDetector = window.require('i18next-electron-language-detector');
  i18n.use(LanguageDetector);
}
i18n.init({
  lng: 'id',
  fallbackLng: 'id',
  debug: true,
  keySeparator: '~',
  defaultNS: 'main',
  ns: ['main'],
  react: {
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'u'],
  },
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
