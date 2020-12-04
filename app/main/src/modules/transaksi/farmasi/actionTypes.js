import { redux } from '@simrs/common';

const { types, createRequestType, createType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;

const GET_INITIAL_FORM = createRequestType('LOAD_INITIAL_FORM');
const SAVE = createRequestType('SAVE_DATA');
const DELETE = createRequestType('DELETE_DATA');

const DELETE_DETAIL = createRequestType('DELETE_DATA_DETAIL');
const GET_DETAIL = createRequestType('LOAD_DATA_DETAIL');
const SAVE_DETAIL = createRequestType('SAVE_DATA_DETAIL');
const FINISH = createRequestType('SELESAI_TRANSAKSI');

const CARI_TRANSAKSI = createRequestType('CARI_TRANSAKSI');
const CARI_ITEM = createRequestType('CARI_ITEM');

export const masterActionTypes = {
  SAVE_REQUEST: SAVE[REQUEST],
  SAVE_SUCCESS: SAVE[SUCCESS],
  SAVE_FAILURE: SAVE[FAILURE],

  DELETE_REQUEST: DELETE[REQUEST],
  DELETE_SUCCESS: DELETE[SUCCESS],
  DELETE_FAILURE: DELETE[FAILURE],

  GET_INITIAL_FORM_REQUEST: GET_INITIAL_FORM[REQUEST],
  GET_INITIAL_FORM_SUCCESS: GET_INITIAL_FORM[SUCCESS],
  GET_INITIAL_FORM_FAILURE: GET_INITIAL_FORM[FAILURE],

  FINISH_REQUEST: FINISH[REQUEST],
  FINISH_SUCCESS: FINISH[SUCCESS],
  FINISH_FAILURE: FINISH[FAILURE],

  ADD: createType('ADD'),
  CANCEL: createType('CANCEL'),
  BATAL: createType('BATAL'),
  RESET: createType('RESET'),
  READY: createType('READY'),
  SELESAI: createType('SELESAI'),
  FILLED: createType('FILLED'),
  MANAGE: createType('MANAGE'),

  SET_DATA_MASTER: createType('SET_DATA_MASTER'),

  OPEN_FORM: createType('OPEN_FORM'),
  AFTER_SAVE: createType('AFTER_SAVE'),
  CHANGE_INPUT: createType('CHANGE_INPUT'),
  ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT'),
};

export const detailActionTypes = {
  SAVE_REQUEST: SAVE_DETAIL[REQUEST],
  SAVE_SUCCESS: SAVE_DETAIL[SUCCESS],
  SAVE_FAILURE: SAVE_DETAIL[FAILURE],

  GET_DETAIL_REQUEST: GET_DETAIL[REQUEST],
  GET_DETAIL_SUCCESS: GET_DETAIL[SUCCESS],
  GET_DETAIL_FAILURE: GET_DETAIL[FAILURE],

  DELETE_REQUEST: DELETE_DETAIL[REQUEST],
  DELETE_SUCCESS: DELETE_DETAIL[SUCCESS],
  DELETE_FAILURE: DELETE_DETAIL[FAILURE],

  EDIT: createType('EDIT_DETAIL'),
  DELETE: createType('DELETE_DETAIL'),
  ADD: createType('ADD_DETAIL'),
  READY: createType('READY_DETAIL'),
  CANCEL: createType('CANCEL_DETAIL'),
  RESET: createType('RESET_DETAIL'),

  SET_DATA_DETAIL: createType('SET_DATA_DETAIL'),
  SELECTED: createType('SELECTED_DETAIL'),
  WARNING: createType('WARNING_DETAIL'),

  OPEN_FORM: createType('OPEN_FORM_DETAIL'),
  AFTER_SAVE: createType('AFTER_SAVE_DETAIL'),
  CHANGE_INPUT: createType('CHANGE_INPUT_DETAIL'),
  ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT_DETAIL'),
};

export const filterActionTypes = {
  CARI_TRANSAKSI_REQUEST: CARI_TRANSAKSI[REQUEST],
  CARI_TRANSAKSI_SUCCESS: CARI_TRANSAKSI[SUCCESS],
  CARI_TRANSAKSI_FAILURE: CARI_TRANSAKSI[FAILURE],

  CARI_ITEM_REQUEST: CARI_ITEM[REQUEST],
  CARI_ITEM_SUCCESS: CARI_ITEM[SUCCESS],
  CARI_ITEM_FAILURE: CARI_ITEM[FAILURE],

  OPEN_DIALOG: createType('OPEN_DIALOG_PENCARIAN'),
  CLOSE_DIALOG: createType('CLOSE_DIALOG_PENCARIAN'),
  CHANGE_INPUT: createType('FILTER_CHANGE_INPUT'),
  RESET: createType('FILTER_RESET'),
  ON_FOCUS_ELEMENT: createType('ON_FOCUS_ELEMENT_FILTER'),
  ON_SUBMIT_TRANSAKSI: createType('ON_SUBMIT_TRANSAKSI'),
  ON_SUBMIT_DETAIL: createType('ON_SUBMIT_DETAIL'),
};
