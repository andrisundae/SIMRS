import actionTypes from './actionTypes';

const staticConst = {
  NON_KELAS: 'non_kelas',
  UMUM: 'UMUM',
  BAYAR_SENDIRI: 'BAYAR SENDIRI',
  UMUR: 'umur',
  TGL_LAHIR: 'tgl_lahir',
  ID_PENJAMIN_UMUM: 0,
  RAWAT_INAP_ALIAS: 'rawat_inap',
  ID_NON_KELAS: 4,
  TEMPAT_TIDUR: 'tempat_tidur',
};

const statusesElements = {
  [actionTypes.READY]: ['norm', 'search', 'add', 'exit'],
  [actionTypes.SELECTED]: ['add', 'edit', 'delete', 'preview', 'finish'],
  [actionTypes.ADD]: [
    'detail_pasien',
    'penjamin_pasien',
    'kunjungan_pasien',
    'cancel',
    'save',
  ],
  [actionTypes.ADD_WITH_SELECTED]: [
    'penjamin_pasien',
    'kunjungan_pasien',
    'cancel',
    'save',
  ],
  [actionTypes.EDIT]: ['penjamin_pasien', 'kunjungan_pasien', 'cancel', 'save'],
};

export { staticConst, statusesElements };
