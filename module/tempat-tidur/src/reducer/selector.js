import { createSelector } from 'reselect';

export const selectedKunjunganSelector = createSelector(
  (state) => state.module.selectedKunjungan,
  (selectedKunjungan) => selectedKunjungan
);