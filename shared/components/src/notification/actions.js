import { redux } from '@simrs/common';

export const actionTypes = {
    SHOW_NOTIFICATION: redux.createType('SHOW_NOTIFICATION'),
    HIDE_NOTIFICATION: redux.createType('HIDE_NOTIFICATION')
}

export default {
    show: (type, message) => ({
        type: actionTypes.SHOW_NOTIFICATION,
        data: { type, message }
    }),
    hide: () => ({
        type: actionTypes.HIDE_NOTIFICATION
    }),
}

