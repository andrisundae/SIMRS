import { remote } from 'electron';

const { dialog, BrowserWindow } = remote;

const confirmation = (options) => (
    dialog.showMessageBox(
        BrowserWindow.getFocusedWindow(),
        {
            type: 'question',
            title: 'Konfirmasi',
            message: 'Apakah Anda yakin ?',
            buttons: ['Ya', 'Tidak'],
            defaultId: 1,
            cancelId: 1,
            ...options
        },
        (dialogResponse) => {
            if (dialogResponse === 0) {
                if (options.onOk) {
                    options.onOk();
                }
            } else if (dialogResponse === 1) {
                if (options.onCancel) {
                    options.onCancel();
                }
            }
        }
    )
)

const messageBox = (options) => (
    dialog.showMessageBox(BrowserWindow.getFocusedWindow(), 
    {
        type: 'info',
        title: 'Informasi',
        ...options
    },
        (dialogResponse) => {
            if (dialogResponse === 0) {
                if (options.onOk) {
                    options.onOk();
                }
            }
        }
    )
)

export {confirmation, messageBox }
