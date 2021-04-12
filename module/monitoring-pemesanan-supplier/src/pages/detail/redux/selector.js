import { createSelector } from 'reselect';

const detailState = (state) => state.default.detail;
const dataTablesState = (state) => state.datatable.datatables;

export const pemesananSupplier = createSelector(
  detailState,
  (detail) => detail.data.pemesanan
);
export const detailPemesanan = createSelector(
  detailState,
  (detail) => detail.data.detailPemesanan
);
export const penerimaan = createSelector(
  detailState,
  (detail) => detail.data.penerimaan
);
export const detailPenerimaan = createSelector(
  detailState,
  (detail) => detail.data.detailPenerimaan
);
export const selectedPenerimaan = createSelector(
  detailState,
  (detail) => detail.data.selectedPenerimaan
);

export const datatableSelector = createSelector(
  dataTablesState,
  (datatables) => datatables
);
