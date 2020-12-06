import { redux } from '@simrs/common';
import {
  masterActionTypes,
  detailActionTypes,
  filterActionTypes,
} from './actionTypes';
import { activity, logActions } from '../../log';

const { createActivity } = logActions;
const { createAction } = redux;

export const masterActions = {
  save: {
    request: (resource, data) =>
      createAction(
        masterActionTypes.SAVE_REQUEST,
        { data },
        { resource, log: createActivity(resource, activity.SIMPAN) }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        masterActionTypes.SAVE_SUCCESS,
        { data },
        { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        masterActionTypes.SAVE_FAILURE,
        { errors },
        { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
      ),
  },
  delete: {
    request: (resource, data) =>
      createAction(
        masterActionTypes.DELETE_REQUEST,
        { data },
        { resource, log: createActivity(resource, activity.HAPUS) }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        masterActionTypes.DELETE_SUCCESS,
        { data },
        { resource, log: createActivity(resource, activity.HAPUS, 'sukses') }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        masterActionTypes.DELETE_FAILURE,
        { errors },
        { resource, log: createActivity(resource, activity.HAPUS, 'gagal') }
      ),
  },
  finish: {
    request: (resource, data) =>
      createAction(
        masterActionTypes.FINISH_REQUEST,
        { data },
        {
          resource,
          log: createActivity(resource, activity.SELESAI, 'SELESAI TRANSAKSI'),
        }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        masterActionTypes.FINISH_SUCCESS,
        { data },
        {
          resource,
          log: createActivity(
            resource,
            activity.SELESAI,
            'SELESAI TRANSAKSI SUCCESS'
          ),
        }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        masterActionTypes.FINISH_FAILURE,
        { errors },
        {
          resource,
          log: createActivity(
            resource,
            activity.SELESAI,
            'SELESAI TRANSAKSI FAILURE'
          ),
        }
      ),
  },
  initialForm: {
    request: (resource, data) =>
      createAction(
        masterActionTypes.GET_INITIAL_FORM_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        masterActionTypes.GET_INITIAL_FORM_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        masterActionTypes.GET_INITIAL_FORM_FAILURE,
        { errors },
        { resource }
      ),
  },
  openForm: (resource) =>
    createAction(
      masterActionTypes.OPEN_FORM,
      {},
      { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
  onAddMaster: (resource) =>
    createAction(
      masterActionTypes.ADD,
      {},
      { resource, log: createActivity(resource, activity.TAMBAH) }
    ),
  onCancel: (resource) =>
    createAction(
      masterActionTypes.CANCEL,
      {},
      { resource, log: createActivity(resource, activity.BATAL) }
    ),
  onBatal: (resource) =>
    createAction(
      masterActionTypes.BATAL,
      {},
      { resource, log: createActivity(resource, activity.BATAL) }
    ),
  onSelesai: (resource) =>
    createAction(
      masterActionTypes.SELESAI,
      {},
      { resource, log: createActivity(resource, activity.SELESAI) }
    ),
  onSelectedData: (resource, data) =>
    createAction(masterActionTypes.SET_DATA_MASTER, { data }, { resource }),
  onReset: (resource) =>
    createAction(masterActionTypes.RESET, {}, { resource }),
  onReady: (resource) =>
    createAction(masterActionTypes.READY, {}, { resource }),
  onAfterSave: (resource) =>
    createAction(masterActionTypes.AFTER_SAVE, {}, { resource }),
  onChangeInput: (resource, data) =>
    createAction(masterActionTypes.CHANGE_INPUT, { data }, { resource }),
  onFocusElement: (resource, element) =>
    createAction(masterActionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
};

export const detailActions = {
  save: {
    request: (resource, data) =>
      createAction(
        detailActionTypes.SAVE_REQUEST,
        { data },
        {
          resource,
          log: createActivity(resource, activity.SIMPAN, 'SIMPAN DETAIL'),
        }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        detailActionTypes.SAVE_SUCCESS,
        { data },
        {
          resource,
          log: createActivity(
            resource,
            activity.SIMPAN,
            'SIMPAN DETAIL SUCCESS'
          ),
        }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        detailActionTypes.SAVE_FAILURE,
        { errors },
        {
          resource,
          log: createActivity(
            resource,
            activity.SIMPAN,
            'SIMPAN DETAIL FAILURE'
          ),
        }
      ),
  },
  delete: {
    request: (resource, data) =>
      createAction(
        detailActionTypes.DELETE_REQUEST,
        { data },
        {
          resource,
          log: createActivity(resource, activity.HAPUS, 'DELETE DETAIL'),
        }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        detailActionTypes.DELETE_SUCCESS,
        { data },
        {
          resource,
          log: createActivity(
            resource,
            activity.HAPUS,
            'DELETE DETAIL SUCCESS'
          ),
        }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        detailActionTypes.DELETE_FAILURE,
        { errors },
        {
          resource,
          log: createActivity(
            resource,
            activity.HAPUS,
            'DELETE DETAIL FAILURE'
          ),
        }
      ),
  },
  onCancel: (resource) =>
    createAction(
      detailActionTypes.CANCEL,
      {},
      { resource, log: createActivity(resource, activity.BATAL) }
    ),
  onAddDetail: (resource) =>
    createAction(
      detailActionTypes.ADD,
      {},
      { resource, log: createActivity(resource, activity.TAMBAH_DETAIL) }
    ),
  onEdit: (resource, data) =>
    createAction(
      detailActionTypes.EDIT,
      { data },
      { resource, log: createActivity(resource, activity.KOREKSI) }
    ),
  onReset: (resource) =>
    createAction(detailActionTypes.RESET, {}, { resource }),
  loadDetail: (resource, data, tableParams) =>
    createAction(
      detailActionTypes.GET_DETAIL_REQUEST,
      { data },
      { resource, tableParams }
    ),
  loadDetailSuccess: (resource, data) =>
    createAction(detailActionTypes.GET_DETAIL_SUCCESS, { data }, { resource }),
  onReady: (resource) =>
    createAction(detailActionTypes.READY, {}, { resource }),
  setWarning: (resource, message) =>
    createAction(detailActionTypes.WARNING, { message }, { resource }),
  onSelectedData: (resource, data) =>
    createAction(detailActionTypes.SET_DATA_DETAIL, { data }, { resource }),
  onSelected: (resource, data) =>
    createAction(detailActionTypes.SELECTED, { data }, { resource }),
  onChangeInput: (resource, data) =>
    createAction(detailActionTypes.CHANGE_INPUT, { data }, { resource }),
  onFocusElement: (resource, element) =>
    createAction(detailActionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
};

export const filterActions = {
  loadTransaksi: (resource, data, tableParams) =>
    createAction(
      filterActionTypes.CARI_TRANSAKSI_REQUEST,
      { data },
      { resource, tableParams }
    ),
  loadTransaksiSuccess: (resource, data) =>
    createAction(
      filterActionTypes.CARI_TRANSAKSI_SUCCESS,
      { data },
      { resource }
    ),
  loadItem: (resource, data, tableParams) =>
    createAction(
      filterActionTypes.CARI_ITEM_REQUEST,
      { data },
      { resource, tableParams }
    ),
  loadItemSuccess: (resource, data, tableParams) =>
    createAction(
      filterActionTypes.CARI_ITEM_SUCCESS,
      { data },
      { resource, tableParams }
    ),
  onSubmitFilterTransaksi: (resource, data) =>
    createAction(
      filterActionTypes.ON_SUBMIT_TRANSAKSI,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onSubmitFilterDetail: (resource, data) =>
    createAction(
      filterActionTypes.ON_SUBMIT_DETAIL,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onCloseDialog: (resource, data) =>
    createAction(filterActionTypes.CLOSE_DIALOG, { data }, { resource }),
  onOpenDialog: (resource, data) =>
    createAction(filterActionTypes.OPEN_DIALOG, { data }, { resource }),
  onChangeInput: (resource, data) =>
    createAction(filterActionTypes.CHANGE_INPUT, { data }, { resource }),
  onFocusElement: (resource, element) =>
    createAction(filterActionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
};
