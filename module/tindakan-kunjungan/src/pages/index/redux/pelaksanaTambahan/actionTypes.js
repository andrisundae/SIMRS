import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;

const GET_PELAKSANA_TAMBAHAN = createRequestType('GET_PELAKSANA_TAMBAHAN');
const GET_ALL_PELAKSANA_TAMBAHAN = createRequestType(
  'GET_ALL_PELAKSANA_TAMBAHAN'
);
const POPULATE_FORM_PELAKSANA_TAMBAHAN = createRequestType(
  'POPULATE_FORM_PELAKSANA_TAMBAHAN'
);
const SAVE_PELAKSANA_TAMBAHAN = createRequestType('SAVE_PELAKSANA_TAMBAHAN');
const DELETE_PELAKSANA_TAMBAHAN = createRequestType(
  'DELETE_PELAKSANA_TAMBAHAN'
);

export const GET_PELAKSANA_TAMBAHAN_REQUEST = GET_PELAKSANA_TAMBAHAN[REQUEST];
export const GET_PELAKSANA_TAMBAHAN_SUCCESS = GET_PELAKSANA_TAMBAHAN[SUCCESS];
export const GET_PELAKSANA_TAMBAHAN_FAILURE = GET_PELAKSANA_TAMBAHAN[FAILURE];

export const GET_ALL_PELAKSANA_TAMBAHAN_REQUEST =
  GET_ALL_PELAKSANA_TAMBAHAN[REQUEST];
export const GET_ALL_PELAKSANA_TAMBAHAN_SUCCESS =
  GET_ALL_PELAKSANA_TAMBAHAN[SUCCESS];
export const GET_ALL_PELAKSANA_TAMBAHAN_FAILURE =
  GET_ALL_PELAKSANA_TAMBAHAN[FAILURE];

export const POPULATE_FORM_PELAKSANA_TAMBAHAN_REQUEST =
  POPULATE_FORM_PELAKSANA_TAMBAHAN[REQUEST];
export const POPULATE_FORM_PELAKSANA_TAMBAHAN_SUCCESS =
  POPULATE_FORM_PELAKSANA_TAMBAHAN[SUCCESS];
export const POPULATE_FORM_PELAKSANA_TAMBAHAN_FAILURE =
  POPULATE_FORM_PELAKSANA_TAMBAHAN[FAILURE];

export const SAVE_PELAKSANA_TAMBAHAN_REQUEST = SAVE_PELAKSANA_TAMBAHAN[REQUEST];
export const SAVE_PELAKSANA_TAMBAHAN_SUCCESS = SAVE_PELAKSANA_TAMBAHAN[SUCCESS];
export const SAVE_PELAKSANA_TAMBAHAN_FAILURE = SAVE_PELAKSANA_TAMBAHAN[FAILURE];

export const DELETE_PELAKSANA_TAMBAHAN_REQUEST =
  DELETE_PELAKSANA_TAMBAHAN[REQUEST];
export const DELETE_PELAKSANA_TAMBAHAN_SUCCESS =
  DELETE_PELAKSANA_TAMBAHAN[SUCCESS];
export const DELETE_PELAKSANA_TAMBAHAN_FAILURE =
  DELETE_PELAKSANA_TAMBAHAN[FAILURE];

export const LOAD_ALL_PELAKSANA_TAMBAHAN = createType(
  'LOAD_ALL_PELAKSANA_TAMBAHAN'
);
export const ADD_PELAKSANA_TAMBAHAN = createType('ADD_PELAKSANA_TAMBAHAN');
export const EDIT_PELAKSANA_TAMBAHAN = createType('EDIT_PELAKSANA_TAMBAHAN');
export const SELECTED_PELAKSANA_TAMBAHAN = createType(
  'SELECTED_PELAKSANA_TAMBAHAN'
);
export const READY_PELAKSANA_TAMBAHAN = createType('READY_PELAKSANA_TAMBAHAN');
export const CANCEL_PELAKSANA_TAMBAHAN = createType(
  'CANCEL_PELAKSANA_TAMBAHAN'
);
export const ON_FOCUS_ELEMENT_PELAKSANA_TAMBAHAN = createType(
  'ON_FOCUS_ELEMENT_PELAKSANA_TAMBAHAN'
);
export const CHANGE_SELECT2_PELAKSANA_TAMBAHAN = createType(
  'CHANGE_SELECT2_PELAKSANA_TAMBAHAN'
);
export const OPEN_FORM_PELAKSANA_TAMBAHAN = createType(
  'OPEN_FORM_PELAKSANA_TAMBAHAN'
);
