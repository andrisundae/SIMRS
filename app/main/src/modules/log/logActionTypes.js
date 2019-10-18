import { redux } from '@simrs/common';

const { types, createRequestType } = redux;
const { REQUEST, SUCCESS, FAILURE } = types;

const INSERT_LOG = createRequestType('INSERT_LOG');

const actionTypes = {
    INSERT_LOG_REQUEST: INSERT_LOG[REQUEST],
    INSERT_LOG_SUCCESS: INSERT_LOG[SUCCESS],
    INSERT_LOG_FAILURE: INSERT_LOG[FAILURE],
}

const activity = {
    LOGIN: 'LOGIN',
    FORCE_LOGIN: 'FORCE_LOGIN',
    MASUK_FORM: 'MASUK_FORM',
    TAMBAH: 'TAMBAH',
    SIMPAN: 'SIMPAN',
    BATAL: 'BATAL',
    KOREKSI: 'KOREKSI',
    HAPUS: 'HAPUS',
    ERROR: 'ERROR',
    CARI: 'CARI',
    RESET_PASSWORD: 'RESET_PASSWORD',
    FORCE_LOGOUT: 'FORCE_LOGOUT',
    LOGOUT: 'LOGOUT',
}

export { actionTypes, activity }
