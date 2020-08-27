import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;

const GET_SETTING_KELAS_PENJAMIN_PASIEN = createRequestType(
  'GET_SETTING_KELAS_PENJAMIN_PASIEN'
);
const GET_ALL_PENJAMIN_PASIEN = createRequestType('GET_ALL_PENJAMIN_PASIEN');

const SAVE_PENJAMIN_PASIEN = createRequestType('SAVE_PENJAMIN_PASIEN');
const DELETE_PENJAMIN_PASIEN = createRequestType('DELETE_PENJAMIN_PASIEN');

export const GET_SETTING_KELAS_PENJAMIN_PASIEN_REQUEST =
  GET_SETTING_KELAS_PENJAMIN_PASIEN[REQUEST];
export const GET_SETTING_KELAS_PENJAMIN_PASIEN_SUCCESS =
  GET_SETTING_KELAS_PENJAMIN_PASIEN[SUCCESS];
export const GET_SETTING_KELAS_PENJAMIN_PASIEN_FAILURE =
  GET_SETTING_KELAS_PENJAMIN_PASIEN[FAILURE];

export const GET_ALL_PENJAMIN_PASIEN_REQUEST = GET_ALL_PENJAMIN_PASIEN[REQUEST];
export const GET_ALL_PENJAMIN_PASIEN_SUCCESS = GET_ALL_PENJAMIN_PASIEN[SUCCESS];
export const GET_ALL_PENJAMIN_PASIEN_FAILURE = GET_ALL_PENJAMIN_PASIEN[FAILURE];

export const SAVE_PENJAMIN_PASIEN_REQUEST = SAVE_PENJAMIN_PASIEN[REQUEST];
export const SAVE_PENJAMIN_PASIEN_SUCCESS = SAVE_PENJAMIN_PASIEN[SUCCESS];
export const SAVE_PENJAMIN_PASIEN_FAILURE = SAVE_PENJAMIN_PASIEN[FAILURE];

export const DELETE_PENJAMIN_PASIEN_REQUEST = DELETE_PENJAMIN_PASIEN[REQUEST];
export const DELETE_PENJAMIN_PASIEN_SUCCESS = DELETE_PENJAMIN_PASIEN[SUCCESS];
export const DELETE_PENJAMIN_PASIEN_FAILURE = DELETE_PENJAMIN_PASIEN[FAILURE];

export const LOAD_ALL_PENJAMIN_PASIEN = createType('LOAD_ALL_PENJAMIN_PASIEN');
export const ADD_PENJAMIN_PASIEN = createType('ADD_PENJAMIN_PASIEN');
export const EDIT_PENJAMIN_PASIEN = createType('EDIT_PENJAMIN_PASIEN');
export const SELECTED_PENJAMIN_PASIEN = createType('SELECTED_PENJAMIN_PASIEN');
export const READY_PENJAMIN_PASIEN = createType('READY_PENJAMIN_PASIEN');
export const CANCEL_PENJAMIN_PASIEN = createType('CANCEL_PENJAMIN_PASIEN');
export const ON_FOCUS_ELEMENT_PENJAMIN_PASIEN = createType(
  'ON_FOCUS_ELEMENT_PENJAMIN_PASIEN'
);
export const CHANGE_SELECT2_PENJAMIN_PASIEN = createType(
  'CHANGE_SELECT2_PENJAMIN_PASIEN'
);
export const CHANGE_INPUT_PENJAMIN_PASIEN = createType(
  'CHANGE_INPUT_PENJAMIN_PASIEN'
);
