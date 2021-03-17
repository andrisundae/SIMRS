import actionTypes from './redux/actionTypes';
const statusesElements = {
  [actionTypes.READY]: ['norm'],
  [actionTypes.SELECTED]: ['edit', 'finish'],
  [actionTypes.EDIT]: ['form', 'cancel', 'save'],
};

const staticConst = {
  TABLE_WILAYAH: 'table_wilayah',
  UMUR: 'umur',
  TGL_LAHIR: 'tgl_lahir',
};

export { statusesElements, staticConst };
