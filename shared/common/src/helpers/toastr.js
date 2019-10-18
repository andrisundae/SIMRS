import { toastr, actions as toastActions } from 'react-redux-toastr';
import i18n from 'i18next';

const emitter = {
    success: (message, title = i18n.t('common:toast.success.title'), options) => toastr.success(title, message, options),
    error: (message, title = i18n.t('common:toast.error.title'), options) => toastr.error(title, message, options),
    warning: (message, title = i18n.t('common:toast.warning.title'), options) => toastr.warning(title, message, options),
    info: (message, title = i18n.t('common:toast.info.title'), options) => toastr.info(title, message, options)
}

const actions = {
    success: (message, title = i18n.t('common:toast.success.title'), options) => toastActions.add({
        title,
        message,
        type: 'success',
        options
    }),
    error: (message, title = i18n.t('common:toast.error.title'), options) => toastActions.add({
        title,
        message,
        type: 'error',
        options
    }),
    warning: (message, title = i18n.t('common:toast.warning.title'), options) => toastActions.add({
        title,
        message,
        type: 'warning',
        options
    }),
    info: (message, title = i18n.t('common:toast.info.title'), options) => toastActions.add({
        title,
        message,
        type: 'info',
        options
    }),
}

export {
    emitter,
    actions
}