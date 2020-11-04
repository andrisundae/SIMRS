import actionTypes from './redux/actionTypes';

const staticConst = {
  TABLE_KUNJUNGAN_UNIT_DETAIL: 'TABLE_KUNJUNGAN_UNIT_DETAIL',
  TABLE_KUNJUNGAN: 'TABLE_KUNJUNGAN',
  TABLE_SEARCH_TINDAKAN: 'TABLE_SEARCH_TINDAKAN',
  ID_PENJAMIN_UMUM: 0,
};

const statusesElements = {
  [actionTypes.READY]: ['norm', staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL],
  [actionTypes.SELECTED]: [
    'add',
    'edit',
    'delete',
    'finish',
    staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL,
  ],
  [actionTypes.ADD]: [
    'form_tindakan',
    'cancel',
    'save',
  ],
  [actionTypes.EDIT]: ['form_tindakan', 'cancel', 'save'],
  [actionTypes.SELECTED_KUNJUNGAN]: [
    'add',
    'finish',
    staticConst.TABLE_KUNJUNGAN_UNIT_DETAIL,
  ],
};

export { staticConst, statusesElements };
