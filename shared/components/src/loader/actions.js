import { redux } from '@simrs/common';

export const actionTypes = {
    SHOW_LOADER: redux.createType('SHOW_LOADER'),
    HIDE_LOADER: redux.createType('HIDE_LOADER')
}

export default {
    show: (message = "Loading...") => redux.createAction(actionTypes.SHOW_LOADER,{ message },{}),
    hide: () => redux.createAction(actionTypes.HIDE_LOADER, {}, {}),
}
