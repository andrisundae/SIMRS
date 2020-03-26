import produce from 'immer';

import actionTypes from './actionTypes';
import { moduleState, filterState } from './state';
import {
    moduleReducer as module,
    filterReducer as filter
} from '@simrs/main/src/modules/master/default';

const moduleReducer = (state = moduleState, action) => {
  let { type, payload } = action;

  switch (type) {
    case actionTypes.POPULATE_FORM_SUCCESS:
      return produce(state, draft => {
          draft.dataForm.options_kelompok_barang = payload.data.kelompok_barang;
          draft.dataForm.options_jenis_barang    = payload.data.jenis_barang;
          draft.dataForm.options_golongan_barang = payload.data.golongan_barang;
          draft.dataForm.options_satuan_barang   = payload.data.satuan_barang;
          draft.dataForm.options_metode_update   = payload.data.metode_update_harga_jual;
      })
    
    case actionTypes.CHANGE_SELECT:
      return produce(state, draft => {
          draft.post[payload.data.idx] = payload.data.selected.value;
          draft.post[payload.data.val] = payload.data.selected.label;
      })

    default:
      return module(state, action, moduleState);
  }
}

const filterReducer = (state = filterState, action) => {

    return filter(state, action);
}


export { moduleReducer, filterReducer }
