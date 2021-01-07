import { redux } from '@simrs/common';
import { activity, logActions } from '@simrs/main/src/modules/log';
import actionTypes from './actionTypes';

const { createActivity } = logActions;
const { createAction } = redux;

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
  populateForm: {
    request: (resource, data) =>
      createAction(actionTypes.POPULATE_FORM_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.POPULATE_FORM_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.POPULATE_FORM_FAILURE, { error }, { resource }),
  },
  asalMasukDetail: {
    request: (resource, data) =>
      createAction(
        actionTypes.ASAL_MASUK_DETAIL_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.ASAL_MASUK_DETAIL_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.ASAL_MASUK_DETAIL_FAILURE,
        { error },
        { resource }
      ),
  },
  instalasi: {
    request: (resource, data) =>
      createAction(actionTypes.INSTALASI_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.INSTALASI_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.INSTALASI_FAILURE, { error }, { resource }),
  },
  unitLayanan: {
    request: (resource, data) =>
      createAction(actionTypes.UNIT_LAYANAN_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.UNIT_LAYANAN_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.UNIT_LAYANAN_FAILURE, { error }, { resource }),
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
  jenisKlasifikasiRegistrasi: {
    request: (resource, data) =>
      createAction(
        actionTypes.JENIS_KLASIFIKASI_REGISTRASI_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.JENIS_KLASIFIKASI_REGISTRASI_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.JENIS_KLASIFIKASI_REGISTRASI_FAILURE,
        { error },
        { resource }
      ),
  },
  nextNorm: {
    request: (resource) =>
      createAction(actionTypes.NEXT_NORM_REQUEST, {}, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.NEXT_NORM_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.NEXT_NORM_FAILURE, { error }, { resource }),
  },
  getPasien: {
    request: (resource, data) =>
      createAction(actionTypes.GET_PASIEN_REQUEST, { data }, { resource }),
    requestSuccess: (resource, data) =>
      createAction(actionTypes.GET_PASIEN_SUCCESS, { data }, { resource }),
    requestFailure: (resource, error) =>
      createAction(actionTypes.GET_PASIEN_FAILURE, { error }, { resource }),
  },
  getKunjunganTerakhir: {
    request: (resource, data) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_TERAKHIR_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_TERAKHIR_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_TERAKHIR_FAILURE,
        { error },
        { resource }
      ),
  },
  getKunjunganDetail: {
    request: (resource, data) =>
      createAction(
        actionTypes.GET_KUNJUNGAN_DETAIL_REQUEST,
        { data },
        { resource }
      ),
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
  getPenjaminPasien: {
    request: (resource, data) =>
      createAction(
        actionTypes.GET_PENJAMIN_PASIEN_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_PENJAMIN_PASIEN_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_PENJAMIN_PASIEN_FAILURE,
        { error },
        { resource }
      ),
  },
  getDetailRangkaianKunjungan: {
    request: (resource, data) =>
      createAction(
        actionTypes.GET_DETAIL_RANGKAIAN_KUNJUNGAN_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_DETAIL_RANGKAIAN_KUNJUNGAN_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_DETAIL_RANGKAIAN_KUNJUNGAN_FAILURE,
        { error },
        { resource }
      ),
  },
  settingKelasPenjamin: {
    request: (resource, data) =>
      createAction(
        actionTypes.GET_SETTING_KELAS_PENJAMIN_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_SETTING_KELAS_PENJAMIN_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_SETTING_KELAS_PENJAMIN_FAILURE,
        { error },
        { resource }
      ),
  },
  getUnitLayananKunjunganHariIni: {
    request: (resource, data) =>
      createAction(
        actionTypes.GET_UNITLAYANAN_KUNJUNGAN_HARI_INI_REQUEST,
        { data },
        { resource }
      ),
    requestSuccess: (resource, data) =>
      createAction(
        actionTypes.GET_UNITLAYANAN_KUNJUNGAN_HARI_INI_SUCCESS,
        { data },
        { resource }
      ),
    requestFailure: (resource, error) =>
      createAction(
        actionTypes.GET_UNITLAYANAN_KUNJUNGAN_HARI_INI_FAILURE,
        { error },
        { resource }
      ),
  },
  loadAllPasien: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_ALL_PASIEN_REQUEST,
      { data },
      { resource, tableParams }
    ),

  loadAllWilayah: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_ALL_WILAYAH_REQUEST,
      { data },
      { tableParams, resource }
    ),
  loadAllKunjunganHariIni: (resource, data, tableParams) =>
    createAction(
      actionTypes.GET_ALL_KUNJUNGAN_HARI_INI_REQUEST,
      { data },
      { tableParams, resource }
    ),
  onReady: (resource) => createAction(actionTypes.READY, {}, { resource }),
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
  onCheckEdit: (resource, data) =>
    createAction(actionTypes.CHECK_EDIT, { data }, { resource }),
  onCheckAdd: (resource, data) =>
    createAction(actionTypes.CHECK_ADD, { data }, { resource }),
  onCheckSave: (resource, data) =>
    createAction(actionTypes.CHECK_SAVE, { data }, { resource }),
  onCheckDelete: (resource, data) =>
    createAction(actionTypes.CHECK_DELETE, { data }, { resource }),
  onSelected: (resource, data) =>
    createAction(actionTypes.SELECTED, { data }, { resource }),
  onAddWithSelected: (resource) =>
    createAction(actionTypes.ADD_WITH_SELECTED, {}, { resource }),
  onCancelWithSelected: (resource) =>
    createAction(actionTypes.CANCEL_WITH_SELECTED, {}, { resource }),
  onFinish: (resource) => createAction(actionTypes.FINISH, {}, { resource }),
  openForm: (resource) =>
    createAction(
      actionTypes.OPEN_FORM,
      {},
      { resource, log: createActivity(resource, activity.MASUK_FORM) }
    ),
  onChangeInput: (resource, data) =>
    createAction(actionTypes.CHANGE_INPUT, { data }, { resource }),
  onFocusElement: (resource, element) =>
    createAction(actionTypes.ON_FOCUS_ELEMENT, { element }, { resource }),
  onChangeSelect2: (resource, name, data, isTindakan) =>
    createAction(
      actionTypes.CHANGE_SELECT2,
      { name, data, isTindakan },
      { resource }
    ),
  toggleShowCariPasien: (resource) =>
    createAction(actionTypes.TOGGLE_SHOW_CARI_PASIEN, {}, { resource }),
  toggleShowCariWilayah: (resource) =>
    createAction(actionTypes.TOGGLE_SHOW_CARI_WILAYAH, {}, { resource }),
  toggleShowCariKunjungan: (resource) =>
    createAction(actionTypes.TOGGLE_SHOW_CARI_KUNJUNGAN, {}, { resource }),
  toggleShowNormModal: (resource) =>
    createAction(actionTypes.TOGGLE_SHOW_NORM_MODAL, {}, { resource }),
  toggleShowKunjunganHariIni: (resource) =>
    createAction(actionTypes.TOGGLE_SHOW_KUNJUNGAN_HARI_INI, {}, { resource }),

  onChangeFilterPasien: (resource, data) =>
    createAction(actionTypes.FILTER_CHANGE_PASIEN, { data }, { resource }),
  onSubmitFilterPasien: (resource, data) =>
    createAction(
      actionTypes.FILTER_SUBMIT_PASIEN,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onChangeFilterWilayah: (resource, data) =>
    createAction(actionTypes.FILTER_CHANGE_WILAYAH, { data }, { resource }),
  onSubmitFilterWilayah: (resource, data) =>
    createAction(
      actionTypes.FILTER_SUBMIT_WILAYAH,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onChangeFilterKunjungan: (resource, data) =>
    createAction(actionTypes.FILTER_CHANGE_KUNJUNGAN, { data }, { resource }),
  onSubmitFilterKunjungan: (resource, data) =>
    createAction(
      actionTypes.FILTER_SUBMIT_KUNJUNGAN,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),

  onSelectedPasien: (resource, data) =>
    createAction(actionTypes.FILTER_SELECTED_PASIEN, { data }, { resource }),
  onSelectedWilayah: (resource, data) =>
    createAction(actionTypes.FILTER_SELECTED_WILAYAH, { data }, { resource }),
  onSelectedKunjungan: (resource, data) =>
    createAction(actionTypes.FILTER_SELECTED_KUNJUNGAN, { data }, { resource }),
  onChangeTab: (resource, data) =>
    createAction(actionTypes.CHANGE_TAB, { data }, { resource }),
  onSubmitFilterKunjunganHariIni: (resource, data) =>
    createAction(
      actionTypes.FILTER_SUBMIT_KUNJUNGAN_HARI_INI,
      { data },
      { resource, log: createActivity(resource, activity.CARI) }
    ),
  onOpenMenuStatusPasien: (resource) =>
    createAction(actionTypes.OPEN_MENU_STATUS_PASIEN, {}, { resource }),
  onCloseMenuStatusPasien: (resource) =>
    createAction(actionTypes.CLOSE_MENU_STATUS_PASIEN, {}, { resource }),
  resetKunjunganDetail: (resource) =>
    createAction(actionTypes.RESET_KUNJUNGAN_DETAIL, {}, { resource }),
};
