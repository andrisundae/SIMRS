import produce from 'immer';
import _ from 'lodash';
import { combineReducers } from 'redux';

import { moduleState, filterState } from './state';
import {
    moduleReducer as module,
    filterReducer as filter,
    moduleActionTypes
} from '@simrs/main/src/modules/master/nested';
import actionTypes from './actionTypes';

export const moduleReducer = (state = moduleState, action) => {

    let { type, payload } = action;

    switch (type) {
        case moduleActionTypes.OPEN_FORM:
            return produce(state, draft => {
                const { tindakan, klasifikasi, tarif, is_edit_tindakan } = payload.data;
                draft.reference = { tindakan, klasifikasi };
                draft.post = {
                    ...moduleState.post,
                    tindakan,
                    tarif_tindakan: tarif,
                    is_edit_tindakan,
                }
            })

        case moduleActionTypes.READY:
            return produce(state, draft => {
                draft.statusForm = moduleActionTypes.READY;
                draft.selectedRow = 0;
            })

        case actionTypes.LOAD_ALL_SUCCESS:
            return produce(state, draft => {
                payload.data.forEach(row => {
                    draft.post.list_tindakan_komponen[row.komponen_tarif] = { ...row };
                })
            })

        case moduleActionTypes.SELECTED: {
            let tgl_aktif_tarif = new Date(payload.data.tgl_aktif_tarif);
            return produce(state, draft => {
                draft.post = {
                    ...payload.data,
                    tgl_aktif_tarif,
                    jam_aktif_tarif: tgl_aktif_tarif
                }
                draft.statusForm = moduleActionTypes.SELECTED;
                draft.selectedRow = payload.data.id;
            })
        }

        case actionTypes.CHANGE_TARIF:
            return produce(state, draft => {
                draft.post.list_tindakan_komponen[payload.data.komponen_tarif] = {
                    ...state.post.list_tindakan_komponen[payload.data.komponen_tarif],
                    tarif: payload.data.tarif
                };
            })

        case actionTypes.SELECTION_CHANGED: {

            return produce(state, draft => {
                state.post.list_tindakan_komponen.forEach((row, index) => {
                    let isExist = _.find(payload.data, (id) => id === index);
                    let aktif = isExist ? 1 : 0;
                    draft.post.list_tindakan_komponen[index] = {
                        ...row,
                        aktif
                    };
                })
            })
        }

        case actionTypes.SELECTED_ROW: {

            return produce(state, draft => {
                if (state.post.list_tindakan_komponen[payload.data.komponen_tarif]) {
                    draft.post.list_tindakan_komponen[payload.data.komponen_tarif].aktif = payload.data.aktif;
                }

            })
        }

        case actionTypes.REDIRECT_TINDAKAN:
            return produce(state, draft => {
                draft.redirectTindakan = payload.data.isRedirect;
            })

        default:
            return module(state, action, moduleState);
    }
}
const filterReducer = (state = filterState, action) => {

    return filter(state, action);
}


export default combineReducers({
    module: moduleReducer,
    filter: filterReducer,
})
