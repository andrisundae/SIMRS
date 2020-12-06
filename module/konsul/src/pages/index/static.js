import actionTypes from './redux/actionTypes';

const staticConst = {
  TABLE_KUNJUNGAN: 'TABLE_KUNJUNGAN',
  ID_PENJAMIN_UMUM: 0,
  RAWAT_DARURAT: 'rawat_darurat',
  RAWAT_JALAN: 'rawat_jalan',
  ID_NON_KELAS: 4,
  NON_KELAS: 'NON KELAS',
  KOREKSI_TANGGAL_KONSUL: 'koreksi_tanggal_konsul',
};

const statusesElements = {
  [actionTypes.READY]: ['norm'],
  [actionTypes.SELECTED]: ['add', 'edit', 'delete', 'finish'],
  [actionTypes.ADD]: ['form_konsul', 'cancel', 'save'],
  [actionTypes.EDIT]: ['form_konsul', 'cancel', 'save'],
  [actionTypes.SELECTED_KUNJUNGAN]: ['add', 'finish', 'delete'],
};

export { staticConst, statusesElements };
