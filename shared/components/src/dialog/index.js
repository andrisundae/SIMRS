import { remote } from 'electron';

const { dialog, BrowserWindow } = remote;

const confirmation = (options) =>
  dialog
    .showMessageBox(BrowserWindow.getFocusedWindow(), {
      type: 'question',
      title: 'Konfirmasi',
      message: 'Apakah Anda yakin ?',
      buttons: ['Ya', 'Tidak'],
      defaultId: 1,
      cancelId: 1,
      ...options,
    })
    .then((data) => {
      if (data.response === 0) {
        if (options.onOk) {
          options.onOk();
        }
      } else if (data.response === 1) {
        if (options.onCancel) {
          options.onCancel();
        }
      } else if (data.response === 2) {
        if (options.onBack) {
          options.onBack();
        }
      }
    });

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

export { confirmation, messageBox };
