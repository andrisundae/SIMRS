import xhr from 'xhr';
import { remote, ipcRenderer } from 'electron';
import { main } from '../store';

const { BrowserWindow, dialog } = remote;

// const BASE_URI = process.env.REACT_APP_API_DOMAIN;
const getPath = (path) => {
  if (!path.match(/(http(s)?:\/\/.)/g)) {
    return `${main.get('config.api')}${path}`;
  } else {
    return path;
  }
};

const postXhr = (path, data, customOptions = {}, callback) => {
  let formData = new FormData();

  Object.keys(data).map((idx) => {
    return formData.append(idx, data[idx]);
  });

  let options = {
    uri: `${getPath(path)}`,
    method: 'post',
    headers: {
      'device-id': main.get('config.uuid'),
      'device-name': main.get('config.computerName'),
      'local-identity': main.get('config.localIdentity'),
      'app-code': main.get('config.appCode'),
      'app-version': main.get('config.appVersion'),
      'api-token': main.get('user.apiToken') ? main.get('user.apiToken') : '',
    },
    body: formData,
    ...customOptions,
  };

  return xhr(options, (err, res, body) => {
    body = err ? body : JSON.parse(body);
    if (res.statusCode === 200) {
      callback(err, res, body);
    } else if (res.statusCode === 403) {
      if (body.data) {
        if (body.data.isValidToken == false) {
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
      }
    }
  });
};

const messageBox = (options) =>
  dialog.showMessageBox(
    BrowserWindow.getFocusedWindow(),
    {
      type: 'info',
      title: 'Informasi',
      ...options,
    },
    (dialogResponse) => {
      if (dialogResponse === 0) {
        if (options.onOk) {
          options.onOk();
        }
      }
    }
  );

export { postXhr };
