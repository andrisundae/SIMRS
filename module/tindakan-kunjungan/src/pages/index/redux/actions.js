import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createAction } = redux;
const { createActivity } = logActions;

export default {
  save: {
    request: (resource, data) =>
      createAction(
        actionTypes.SAVE_REQUEST,
        { data },
        { resource, log: createActivity(resource, activity.SIMPAN) }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.SAVE_SUCCESS,
        { data },
        { resource, log: createActivity(resource, activity.SIMPAN, 'sukses') }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        actionTypes.SAVE_FAILURE,
        { errors },
        { resource, log: createActivity(resource, activity.SIMPAN, 'gagal') }
      ),
  },
  delete: {
    request: (resource, data) =>
      createAction(
        actionTypes.DELETE_REQUEST,
        { data },
        { resource, log: createActivity(resource, activity.HAPUS) }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.DELETE_SUCCESS,
        { data },
        { resource, log: createActivity(resource, activity.HAPUS, 'sukses') }
      ),
    requestFailure: (resource, errors) =>
      createAction(
        actionTypes.DELETE_FAILURE,
        { errors },
        { resource, log: createActivity(resource, activity.HAPUS, 'gagal') }
      ),
  },
  getAll: {
    request: (resource, data) =>
      createAction(actionTypes.GET_ALL_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_ALL_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_ALL_FAILURE, { error }, { resource }),
  },
  loadAll: (resource, data, tableParams) =>
    createAction(actionTypes.LOAD_ALL, { data }, { tableParams, resource }),
  onReady: (resource) => createAction(actionTypes.READY, {}, { resource }),
  openForm: (resource) =>
    createAction(
      actionTypes.OPEN_FORM,
      {},
      { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
  onChangeInputIdentitas: (resource, data) =>
    createAction(actionTypes.INPUT_CHANGE_IDENTITAS, { data }, { resource }),
  onSubmitFilter: (resource, data) =>
    createAction(
      actionTypes.SUBMIT_FILTER,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onReset: (resource) => createAction(actionTypes.RESET, {}, { resource }),
  onResetFilter: (resource) =>
    createAction(actionTypes.RESET_FILTER, {}, { resource }),
  onFocusElement: (resource, element) =>
    createAction(actionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
  onChangePelaksana: (resource, data) =>
    createAction(actionTypes.CHANGE_PELAKSANA, { data }, { resource }),
  populateForm: {
    request: (resource, data) =>
      createAction(actionTypes.POPULATE_FORM_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.POPULATE_FORM_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.POPULATE_FORM_FAILURE, { error }, { resource }),
  },
  getPasien: {
    request: (resource, data) =>
      createAction(actionTypes.GET_PASIEN_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_PASIEN_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_PASIEN_FAILURE, { error }, { resource }),
  },
  getKunjungan: {
    request: (resource, data) =>
      createAction(actionTypes.GET_KUNJUNGAN_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_KUNJUNGAN_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_KUNJUNGAN_FAILURE, { error }, { resource }),
  },
  getKunjunganUnitDetail: {
    request: (resource, data, tableParams) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_UNIT_DETAIL_REQUEST,
        { data },
        { tableParams, resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_UNIT_DETAIL_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_UNIT_DETAIL_FAILURE,
        { error },
        { resource }
      ),
  },
  tindakanSuggestion: {
    request: (resource, data, tableParams) =>
      createAction(
        actionTypes.GET_TINDAKAN_SUGGESTION_REQUEST,
        { data },
        { tableParams, resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_TINDAKAN_SUGGESTION_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_TINDAKAN_SUGGESTION_FAILURE,
        { error },
        { resource }
      ),
  },
  kunjunganDetail: {
    request: (resource) =>
      createAction(actionTypes.GET_KUNJUNGAN_DETAIL_REQUEST, {}, { resource }),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_DETAIL_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_DETAIL_FAILURE,
        { error },
        { resource }
      ),
  },
  getPelaksana: {
    request: (resource, data) =>
      createAction(actionTypes.GET_PELAKSANA_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_PELAKSANA_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_PELAKSANA_FAILURE, { error }, { resource }),
  },
  optionsByUnitLayanan: {
    request: (resource, data) =>
      createAction(
        actionTypes.OPTIONS_BY_UNITLAYANAN_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.OPTIONS_BY_UNITLAYANAN_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.OPTIONS_BY_UNITLAYANAN_FAILURE,
        { error },
        { resource }
      ),
  },
  onSelectKunjungan: (resource, data) =>
    createAction(actionTypes.SELECTED_KUNJUNGAN, { data }, { resource }),
  showCariKunjungan: (resource) =>
    createAction(actionTypes.SHOW_CARI_KUNJUNGAN, {}, { resource }),
  hideCariKunjungan: (resource) =>
    createAction(actionTypes.HIDE_CARI_KUNJUNGAN, {}, { resource }),
  cancelSelectedKunjungan: (resource) =>
    createAction(actionTypes.CANCEL_SELECTED_KUNJUNGAN, {}, { resource }),
  submitFilterSuggestion: (resource, data) =>
    createAction(
      actionTypes.SUBMIT_FILTER_TINDAKAN_SUGGESTION,
      { data },
      { resource }
    ),
  onSelectTindakanSuggestion: (resource, data) =>
    createAction(
      actionTypes.SELECTED_TINDAKAN_SUGGESTION,
      { data },
      { resource }
    ),
  onAdd: (resource) =>
    createAction(
      actionTypes.ADD,
      {},
      { resource, log: createActivity(resource, activity.TAMBAH) }
    ),
  onEdit: (resource) =>
    createAction(
      actionTypes.EDIT,
      {},
      { resource, log: createActivity(resource, activity.KOREKSI) }
    ),
  onCancel: (resource) => createAction(actionTypes.CANCEL, {}, { resource }),
  onSelected: (resource, data) =>
    createAction(actionTypes.SELECTED, { data }, { resource }),
  onFinish: (resource) => createAction(actionTypes.FINISH, {}, { resource }),
  populateAdd: (resource, data) =>
    createAction(actionTypes.POPULATE_ADD, { data }, { resource }),
  showCariTindakan: (resource) =>
    createAction(actionTypes.SHOW_CARI_TINDAKAN, {}, { resource }),
  hideCariTindakan: (resource) =>
    createAction(actionTypes.HIDE_CARI_TINDAKAN, {}, { resource }),
  onChangeInputTindakan: (resource, data) =>
    createAction(actionTypes.INPUT_CHANGE_TINDAKAN, { data }, { resource }),
  onShowPelaksanaTambahan: (resource) =>
    createAction(actionTypes.SHOW_PELAKSANA_TAMBAHAN, {}, { resource }),
  onHidePelaksanaTambahan: (resource) =>
    createAction(actionTypes.HIDE_PELAKSANA_TAMBAHAN, {}, { resource }),
};
