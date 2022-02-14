import axios from 'axios';
import { remote, ipcRenderer } from 'electron';
// import _ from 'lodash';
import { main } from '../store';

const { BrowserWindow, dialog } = remote;

const messageBox = (options) =>
  dialog
    .showMessageBox(BrowserWindow.getFocusedWindow(), {
      type: 'info',
      title: 'Informasi',
      ...options,
    })
    .then((data) => {
      if (data.response === 0) {
        if (options.onOk) {
          options.onOk();
        }
      }
    });

const simrsHeaders = (isWithToken = true) => {
  let headers = {
    'device-id': main.get('config.uuid'),
    'device-name': main.get('config.computerName'),
    'local-identity': main.get('config.localIdentity'),
    'app-code': main.get('config.appCode'),
    'app-version': main.get('config.appVersion'),
  };

  if (isWithToken) {
    headers['api-token'] = main.get('user.apiToken')
      ? main.get('user.apiToken')
      : '';
  }

  return headers;
};

export const generateBaseUri = () => {
  let apiUrl = main.get('config.api');
  // if (_.includes(apiUrl, 'https://')) {
  //   apiUrl = `https://${apiUrl}`;
  // } else {
  //   apiUrl = `http://${apiUrl}`;
  // }
  return apiUrl;
};

const customAxios = axios.create({
  baseURL: generateBaseUri(),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    ...simrsHeaders(),
  },
  timeout: 100000,
});

const isAuthorization = (config = {}) => {
  return !!config.headers.Authorization;
};

export const requestHandler = (request) => {
  if (isAuthorization(request)) {
    const token = main.get('user.apiToken') ? main.get('user.apiToken') : '';
    if (token) {
      request.headers['api-token'] = token;
    }
  }
  return request;
};

export const errorHandler = (error) => {
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }

  const responseData = error.response && error.response.data;
  const status = error.response && error.response.status;
  const errorMessage =
    error.response && error.response.data.message
      ? error.response.data.message
      : 'Network error';
  switch (status) {
    case 401:
      // const currentLocation = history.location.pathname;
      // if (history.location.pathname !== '/user/login') {
      //   NProgress.done();
      //   store.dispatch(showLoginForm());
      //   // localStore.set('app.previousPathname', currentLocation);
      //   // store.dispatch(push('/user/login'));
      // }
      // console.log(401);
      // router.push('/auth/login');
      break;

    case 400: // Bad Request
      break;
    case 403: // Token expired
      if (responseData.data) {
        if (responseData.data.isValidToken == false) {
          if (main.get('expiredToken') === 0) {
            messageBox({
              message:
                'Login Anda sudah expired, silah klik tombol OK untuk login kembali.',
              onOk: () => {
                let mainWindow = BrowserWindow.fromId(1);
                ipcRenderer.send('session-expired');
                window.close();
                mainWindow.focus();
              },
            });
          }
          main.set('expiredToken', 1);
        }
      }
      break;
    case 404: // Not Found
      break;
    case status >= 500: // Server error
      break;

    case 422:
      // Sentry.captureException(errorMessage);
      break;
    default:
      break;
  }
  // if (errorMessage) {
  //   messageBox({
  //     message: errorMessage,
  //   });
  // }

  return Promise.reject(error?.response);
};

export const successHandler = (response) => {
  return response;
};

// Create custom axios GET with cancellation
export const makeGetRequestCreator = () => {
  let call;
  return (url) => {
    if (call) {
      call.cancel('Only one request allowed at a time.');
    }
    call = axios.CancelToken.source();
    return customAxios.get(url, {
      cancelToken: call.token,
    });
  };
};

export const getOnce = makeGetRequestCreator();

customAxios.interceptors.request.use((request) => requestHandler(request));
customAxios.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
