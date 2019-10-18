import produce from 'immer';

import initialState from './state';
import actionTypes from './actionTypes';


const createColumnOrder = (data, order) => {
    let columns = data.map((row) => {
        let newRow = {...row, order}

        return newRow
    })
    
    return columns;
}

export default (state = initialState, action) =>
    produce(state, draft => {
        let { type, payload } = action

        switch (type) {
            case actionTypes.POPULATE_FORM_SUCCESS:
                draft.form.data.options_versi_tarif = payload.data.versi_tarif;
                draft.form.data.options_column_order =  [
                    {label: 'ASC', options: createColumnOrder(payload.data.column_order, 'ASC')},
                    {label: 'DESC', options: createColumnOrder(payload.data.column_order, 'DESC')}
                ];
                return

            case actionTypes.CHANGE_VERSI_TARIF: {
                draft.form.post.versi_tarif = payload.data ? payload.data.value : '';
                draft.form.post.selectedVersiTarif = payload.data;
                draft.focusElement = '';
                return
            }

            case actionTypes.CHANGE_JENIS_EKSPOR: {
                draft.form.post.jenis_ekspor = payload.data ? payload.data.value : '';
                draft.form.post.selectedJenisEkspor = payload.data;
                draft.focusElement = '';
                return
            }

            case actionTypes.CHANGE_COLUMN_ORDER: {
                draft.form.post.selectedColumnOrder = payload.data;
                if (payload.data) {
                    draft.form.post.orders = payload.data.map((row) => {
                        return { column: row.value, order: row.order}
                    })
                } else {
                    draft.form.post.orders = [];
                }
                
                draft.focusElement = '';
                return
            }

            case actionTypes.GET_HEADER_KOMPONEN_SUCCESS: {
                draft.headerColumnKomponen = payload.data;
                return
            }

            case actionTypes.ON_FOCUS_ELEMENT:
                draft.focusElement = payload.element;
                return
            
            case actionTypes.FILTER_SUBMIT_FAILURE:
                return produce(state, draft => {
                    draft.focusElement = '';
                })

            case actionTypes.RESET:
            default:
                return state;
        }
    })
