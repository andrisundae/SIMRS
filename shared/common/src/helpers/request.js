import { remote, ipcRenderer } from 'electron';
import { main } from '../store';

const { BrowserWindow, dialog } = remote;

// const BASE_URI = process.env.REACT_APP_API_DOMAIN;
var defaultSearchParams = new URLSearchParams();

const simrsHeaders = (isWithToken = true) => {
    let headers = {
        'device-id': main.get('config.macAddress'),
        'device-name': main.get('config.computerName'),
        'local-identity': main.get('config.localIdentity'),
        'app-code': main.get('config.appCode'),
    }

    if (isWithToken) {
        headers['api-token'] = main.get('user.apiToken') ? main.get('user.apiToken') : '';
    }

    return headers;
}

const defaultOptions = {
    mode: 'cors',
    cache: 'no-cache',
    timeout: 30000
};

const getPath = (path) => {
    if (!path.match(/(http(s)?:\/\/.)/g)) {
        return `${main.get('config.api')}${path}`;
    } else {
        return path;
    }
}

const get = async (path, data) => {
    if (data) {
        Object.keys(data).forEach(function (key) {
            defaultSearchParams.set(key, data[key]);
        }, this);
    }

    const requestData = new Request(
        `${getPath(path)}?${defaultSearchParams.toString()}`,
        { ...defaultOptions,
            headers: simrsHeaders()
        }
    )

    const response = await fetch(requestData).then(statusHandler).catch(error => {
        console.log(error.message)
        return Promise.reject(error)
    });
    return response;
}

const post = async (path, data = {}, options, isParseArray=true) => {
    const formData = new FormData();

    Object.keys(data).forEach((idx) => {
        let value = data[idx];

        if (value instanceof Object && isParseArray) {
            value = JSON.stringify(value);
            formData.append(idx, value);
        } else if (Array.isArray(value) && !isParseArray) {
            value.forEach(item => {
                formData.append(`${idx}[]`, item)
            })
        } else {
            formData.append(idx, value);
        }
    });

    const newOptions = {
        method: 'POST',
        body: formData,
        ...defaultOptions,
        headers: simrsHeaders(),
        ...options,
    }


    const requestData = new Request(getPath(path), newOptions);
    const response = await fetch(requestData).then(statusHandler).catch(error => {
        console.log(error.message)
        return Promise.reject(error)
    });

    return response;
}

const statusHandler = (response) => {
    if (!response.ok) {
        if (response.status === 403) {
            let responses = response.json();
            return responses.then(dataResponse => {
                if (dataResponse.data) {
                    if (dataResponse.data.isValidToken == false) {
                        if (main.get('expiredToken') === 0) {
                            messageBox({
                                message: 'Login Anda sudah expired, silah klik tombol OK untuk login kembali.',
                                onOk: () => {
                                    let mainWindow = BrowserWindow.fromId(1);
                                    ipcRenderer.send('session-expired');
                                    window.close();
                                    mainWindow.focus();
                                }
                            });
                        }
                        main.set('expiredToken', 1);
                    }
                }
                return dataResponse;
            })
        }
        throw new Error(response.statusText);
    }
    return response.json();
}

const _responseHandler = (response) => {
    console.log(response)
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        let responses = response.json();
        return responses.then(dataResponse => {
            if (dataResponse.data) {
                if (dataResponse.data.isValidToken == false) {
                    messageBox({
                        message: 'Login Anda sudah expired, silah klik tombol OK untuk login kembali.',
                        onOk: () => {
                            let mainWindow = BrowserWindow.fromId(1);
                            ipcRenderer.send('session-expired');
                            window.close();
                            mainWindow.focus();
                        }
                    });
                }
            }
            return dataResponse;
        })
    } else if (response.status === 404) {
        return Promise.reject('Not found')
    } else {
        throw new HttpError(response);
    }
}

const messageBox = (options) => (
    dialog.showMessageBox(BrowserWindow.getFocusedWindow(),
        {
            type: 'info',
            title: 'Informasi',
            ...options
        }
    ).then((data) => {
        if (data.response === 0) {
            if (options.onOk) {
                options.onOk();
            }
        }
    })
)

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

export { get, post, getPath, simrsHeaders }
