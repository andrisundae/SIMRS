import actionTypes from './redux/actionTypes';

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
  PENJAMIN_PASIEN_RESOURCE: '_billing_master_penjamin_pasien',
  TABLE_PASIEN: 'table_pasien',
  TABLE_KUNJUNGAN: 'table_kunjungan',
  TABLE_WILAYAH: 'table_wilayah',
  TABLE_KUNJUNGAN_HARI_INI: 'table_kunjungan_hari_ini',
};

const statusesElements = {
  [actionTypes.READY]: ['norm', 'search', 'add', 'exit'],
  [actionTypes.SELECTED]: [
    'add',
    'edit',
    'delete',
    'preview',
    'finish',
    'tab_penjamin_pasien',
    'norm_ibunya',
  ],
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

export const TAB_KUNJUNGAN = 0;
export const TAB_PENJAMIN_PASIEN = 1;

export { staticConst, statusesElements };
