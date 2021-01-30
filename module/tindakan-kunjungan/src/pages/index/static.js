import actionTypes from './redux/actionTypes';
import * as pelaksanaTambahanActionTypes from './redux/pelaksanaTambahan/actionTypes';

const staticConst = {
  TABLE_KUNJUNGAN_UNIT_DETAIL: 'TABLE_KUNJUNGAN_UNIT_DETAIL',
  TABLE_KUNJUNGAN: 'TABLE_KUNJUNGAN',
  TABLE_SEARCH_TINDAKAN: 'TABLE_SEARCH_TINDAKAN',
  TABLE_PELAKSANA_TAMBAHAN: 'TABLE_PELAKSANA_TAMBAHAN',
  TABLE_PELAKSANA_KOMPONEN: 'TABLE_PELAKSANA_KOMPONEN',
  ID_PENJAMIN_UMUM: 0,
};

const statusesElements = {
  [actionTypes.READY]: ['norm', staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL],
  [actionTypes.SELECTED]: [
    'add',
    'edit',
    'delete',
    'finish',
    'pelaksana_tambahan',
    staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL,
  ],
  [actionTypes.ADD]: ['form_tindakan', 'cancel', 'save'],
  [actionTypes.EDIT]: ['form_tindakan', 'cancel', 'save'],
  [actionTypes.SELECTED_KUNJUNGAN]: [
    'add',
    'finish',
    staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL,
  ],
};

const statusesPelaksanaTambahan = {
  [pelaksanaTambahanActionTypes.READY_PELAKSANA_TAMBAHAN]: [
    'add',
    staticConst.TABLE_PELAKSANA_TAMBAHAN,
  ],
  [pelaksanaTambahanActionTypes.SELECTED_PELAKSANA_TAMBAHAN]: [
    'add',
    'edit',
    'delete',
    staticConst.TABLE_PELAKSANA_TAMBAHAN,
  ],
  [pelaksanaTambahanActionTypes.ADD_PELAKSANA_TAMBAHAN]: [
    'form_pelaksana_tambahan',
    'cancel',
    'save',
  ],
  [pelaksanaTambahanActionTypes.EDIT_PELAKSANA_TAMBAHAN]: [
    'form_pelaksana_tambahan',
    'cancel',
    'save',
  ],
};

export { staticConst, statusesElements, statusesPelaksanaTambahan };
