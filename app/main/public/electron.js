require('dotenv').config();
const si = require('systeminformation');
const path = require('path');
const { format } = require('url');
const { app, BrowserWindow, session } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store({ encryptionKey: '09308608908408809208606806623' });
const sha256 = require('js-sha256').sha256;
const packageJson = require('../package.json');

app.disableHardwareAcceleration();

store.set('config.appVersion', packageJson.version);

si.users().then((data) => {
  const computerName = data[0].user;
  store.set('config.computerName', computerName);
  si.system().then((data) => {
    store.set('config.uuid', data.uuid);
    store.set('config.localIdentity', sha256(data.uuid + computerName));
  });
});
si.osInfo().then((data) => {
  store.set('config.appCode', 'simrs-' + data.platform);
});

var mainWindow;
var splash;

function createMainWindow() {
  store.set('user.openedApp', 0);
  store.set('user.isLogin', false);

  const window = new BrowserWindow({
    width: 750,
    height: 500,
    frame: false,
    show: false,
    backgroundColor: '#2C3E50',
    resizable: false,
    id: 1,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  window.on('close', (e) => {
    const openedApp = store.get('user.openedApp') || 0;

    if (0 < openedApp || store.get('user.isLogin')) {
      e.preventDefault();
    }
  });
  window.on('closed', () => {
    mainWindow = null;
  });

  const url = isDev
    ? `http://localhost:${process.env.PORT}`
    : formatPath('index.html');

  window.loadURL(url);

  return window;
}

function createSplashWindow() {
  let splash = new BrowserWindow({
    width: 350,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    center: true,
    modal: true,
    skipTaskbar: true,
  });

  splash.loadURL(formatPath('splash.html'));

  return splash;
}

function formatPath(file) {
  return format({
    pathname: path.join(__dirname, file),
    protocol: 'file',
    slashes: true,
  });
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }

      mainWindow.focus();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      mainWindow = createMainWindow();
    }
  });
  app.on('ready', async () => {
    mainWindow = createMainWindow();

    splash = createSplashWindow();
    splash.show();

    mainWindow.on('ready-to-show', () => {
      splash.destroy();
      mainWindow.show();
      mainWindow.focus();
    });

    await session.defaultSession.loadExtension(
      path.join(__dirname, '../devtools/react')
    );
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('will-quit', () => {
    let mainWindow = BrowserWindow.fromId(1);
    mainWindow.focus();
  });
}
