import { createSelector } from 'reselect';
import _ from 'lodash';
import { formEnable } from '../../static';

const dataTablesState = (state) => state.datatable.datatables;
const loaderState = (state) => state.loader;
const masterState = (state) => state.default.master;
const detailState = (state) => state.default.detail;
const filterState = (state) => state.default.filter;

export const datatableSelector = createSelector(
  dataTablesState,
  (datatables) => datatables
);
export const loaderSelector = createSelector(
  loaderState,
  (loader) => loader.count > 0
);
export const loaderMessageSelector = createSelector(
  loaderState,
  (loader) => loader.message
);

export const postMaster = createSelector(masterState, (master) => master.post);
export const afterMaster = createSelector(
  masterState,
  (master) => master.dataAfterSave
);
export const initMaster = createSelector(
  masterState,
  (master) => master.data.initial
);
export const statusFormMaster = createSelector(
  masterState,
  (master) => master.statusForm
);
export const focusElementMaster = createSelector(
  masterState,
  (master) => master.focusElement
);
export const disableFormMaster = createSelector(masterState, (master) => {
  if (_.includes(formEnable.MasterStatus, master.statusForm)) {
    return true;
  }

  return false;
});

export const postDetail = createSelector(detailState, (detail) => detail.post);
export const afterDetail = createSelector(
  detailState,
  (detail) => detail.dataAfterSave
);
export const dataItemDetail = createSelector(
  detailState,
  (detail) => detail.data.item_list
);
export const focusElementDetail = createSelector(
  detailState,
  (detail) => detail.focusElement
);
export const disableFormDetail = createSelector(detailState, (detail) => {
  if (_.includes(formEnable.DetailStatus, detail.statusForm)) {
    return true;
  }

  return false;
});

export const cariMaster = createSelector(
  filterState,
  (filter) => filter.cari_master
);
export const cariDetail = createSelector(
  filterState,
  (filter) => filter.cari_detail
);
export const cariPemsanan = createSelector(
  filterState,
  (filter) => filter.cari_pemesanan
);
export const focusElementFilter = createSelector(
  filterState,
  (filter) => filter.focusElement
);
export const showDialogTransaksi = createSelector(
  filterState,
  (filter) => filter.filter_modal.master_modal.show
);
export const showDialogItem = createSelector(
  filterState,
  (filter) => filter.filter_modal.detail_modal.show
);
export const showDialogPemesanan = createSelector(
  filterState,
  (filter) => filter.filter_modal.pemesanan_modal.show
);
export const optionFilterPemesanan = createSelector(
  filterState,
  (filter) => filter.data.initial.option_filter_pemesanan
);
export const optionFilterTransaksi = createSelector(
  filterState,
  (filter) => filter.data.initial.option_filter_transaksi
);
export const selectedData = createSelector(
  filterState,
  (filter) => filter.data.selectedData
);
