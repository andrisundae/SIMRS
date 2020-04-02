require('dotenv').config();
const os = require('os');
const path = require('path');
const { format } = require('url');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store({ encryptionKey: process.env.REACT_APP_SECRET });
const sha256 = require('js-sha256').sha256;
const salt = '';

store.set('config.computerName', os.hostname());
store.set('config.appCode', 'web-client');

Object.values(os.networkInterfaces()).find(networkTypes => {
  return (
    undefined !==
    Object.values(networkTypes).find(network => {
      const hasMacAddress =
        '00:00:00:00:00' !== network.mac && 'IPv4' === network.family;

      if (hasMacAddress) {
        store.set('config.macAddress', network.mac.toUpperCase());
        const token = generateToken(network.mac.toUpperCase(), os.hostname());
        if (token) {
          store.set('config.localIdentity', token);
        }
      }

      return hasMacAddress;
    })
  );
});

var mainWindow;
var splash;

function createMainWindow() {
  store.set('user.openedApp', 0);
  store.set('user.isLogin', false);

  const window = new BrowserWindow({
    width: 600,
    height: 450,
    frame: false,
    show: false,
    backgroundColor: '#2C3E50',
    resizable: false,
    id: 1,
    webPreferences: {
      nodeIntegration: true
    }
  });
  window.on('close', e => {
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

  // window.webContents.openDevTools({detach: true});
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
    skipTaskbar: true
  });

  splash.loadURL(formatPath('splash.html'));

  return splash;
}

function formatPath(file) {
  return format({
    pathname: path.join(__dirname, file),
    protocol: 'file',
    slashes: true
  });
}

function generateToken(macAddress, computerName) {
  return sha256(macAddress + computerName + salt);
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
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
  app.on('ready', () => {
    mainWindow = createMainWindow();

    splash = createSplashWindow();
    splash.show();

    mainWindow.on('ready-to-show', () => {
      splash.destroy();
      mainWindow.show();
      mainWindow.focus();
    });
  });
  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  // app.on('window-all-closed', process.exit);
  app.on('will-quit', () => {
    let mainWindow = BrowserWindow.fromId(1);
    mainWindow.focus();
  });
  // app.on('before-quit', () => {
  //   mainWindow.removeAllListeners('close');
  //   // mainWindow.close();
  // });
}
