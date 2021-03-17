import actionTypes from './redux/actionTypes';
const statusesElements = {
  [actionTypes.READY]: ['norm'],
  [actionTypes.SELECTED]: ['edit', 'finish'],
  [actionTypes.EDIT]: ['form', 'cancel', 'save'],
};

const staticConst = {
  TABLE_RIWAYAT_KUNJUNGAN: 'TABLE_RIWAYAT_KUNJUNGAN',
  TABLE_RIWAYAT_KUNJUNGAN_UNIT: 'TABLE_RIWAYAT_KUNJUNGAN_UNIT',
  TABLE_RIWAYAT_KUNJUNGAN_UNIT_DETAIL: 'TABLE_RIWAYAT_KUNJUNGAN_UNIT_DETAIL',
};

export { statusesElements, staticConst };
