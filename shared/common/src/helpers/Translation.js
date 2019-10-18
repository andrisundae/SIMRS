import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-fetch-backend';
import LanguageDetector from 'i18next-electron-language-detector';

import {simrsHeaders} from './request';

class Translation {
    
    constructor(options) {
        this.options = options;
    }

    init() {
        const fetch = new Backend(null, {
            loadPath: (lngs, namespace) => {
                return `http://simrs-x.test/translation/${lngs}/${namespace}`
            },
            stringify: JSON.stringify,
            allowMultiLoading: false,
            multiSeparator: '+',
            requestOptions: {
                mode: 'cors',
                cache: 'no-cache',
                headers: simrsHeaders()
            },
        });

        i18n
            .use(fetch)
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
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
                ...this.options
            });
    }
}

export {Translation};