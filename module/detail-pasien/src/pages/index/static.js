import actionTypes from './redux/actionTypes';
const statusesElements = {
  [actionTypes.READY]: ['norm'],
  [actionTypes.SELECTED]: ['edit', 'finish'],
  [actionTypes.EDIT]: ['form', 'cancel', 'save'],
};

const staticConst = {
  TABLE_SEARCH_WILAYAH: 'TABLE_SEARCH_WILAYAH',
  UMUR: 'umur',
  TGL_LAHIR: 'tgl_lahir',
};

export { statusesElements, staticConst };
