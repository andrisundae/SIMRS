import produce from 'immer';

import actionTypes from './actionTypes';
import { moduleState, filterState, uploadGambarState } from './state';
import {
    moduleReducer as module,
    filterReducer as filter
} from '@simrs/main/src/modules/master/default';
import { filterIndexActionTypes } from './actionTypes';

const moduleReducer = (state = moduleState, action) => {

    let { type, payload } = action;

    switch (type) {
        case actionTypes.POPULATE_FORM_SUCCESS:
            return produce(state, draft => {
                let {jenis_kelamin: jenisKelamin, pendidikan, jenis_pegawai: jenisPegawai,
                    spesialisasi_pegawai: spesialisasiPegawai, jabatan_fungsional: jabatanFungsional,
                    status_aplikasi: statusAplikasi, grups
                } = payload.data;

                draft.data.options_jenis_kelamin = jenisKelamin;
                draft.data.options_pendidikan = pendidikan;
                draft.data.options_jenis_pegawai = jenisPegawai;
                draft.data.options_spesialisasi = spesialisasiPegawai;
                draft.data.options_jabatan_fungsional = jabatanFungsional;
                draft.data.options_status_aplikasi = statusAplikasi;
                draft.data.options_grup = grups;
            })

        case actionTypes.CHANGE_SELECT2: {
            let { data, name } = payload;
            return produce(state, draft => {
                draft.post[name] = data.value;
                draft.focusElement = '';
            })
        }

        case actionTypes.CHANGE_GRUP: {
            let { data } = payload;

            return produce(state, draft => {
                if (data.isSelected) {
                    draft.post.grups = state.post.grups.filter(row => row !== data.value);
                } else {
                    draft.post.grups = [
                        ...state.post.grups,
                        data.value
                    ];
                }

                draft.focusElement = '';
            })
        }

        case actionTypes.AUTH_GET_GRANTED_SUCCESS: {
            return produce(state, draft => {
                draft.auth.forceLogout = payload.data.forceLogout;
                draft.auth.resetPassword = payload.data.resetPassword;
            })
        }

        default:
            return module(state, action, moduleState);
    }
}

const filterReducer = (state = filterState, action) => {
    let { type, payload } = action;

    switch (type) {
        case actionTypes.POPULATE_FORM_SUCCESS:
            return produce(state, draft => {
                draft.data.options_status_aplikasi = payload.data.status_aplikasi;
            })

        case filterIndexActionTypes.FILTER_CHANGE_STATUS_APLIKASI:
            return produce(state, draft => {
                draft.post[payload.data.name] = payload.data.value;
            })

        default:
            return filter(state, action);
    }
}

const uploadGambarReducer = (state = uploadGambarState, action) => {
    let { type, payload } = action;

    switch (type) {
        case actionTypes.OPEN_UPLOAD_GAMBAR:
            return produce(state, draft => {
                draft.show = true;
                draft.post.id_personel = payload.data.id;
                draft.post.selectedPersonel = {
                    value: payload.data.id,
                    label: payload.data.nama
                };
            })

        case actionTypes.CLOSE_UPLOAD_GAMBAR:
            return produce(state, draft => {
                draft.show = false;
            })
        
        case actionTypes.POPULATE_FORM_UPLOADGAMBAR_SUCCESS:
            return produce(state, draft => {
                draft.data.options_jenis_gambar = payload.data.jenis_gambar;
                draft.data.options_personel = payload.data.personel;
            })
        
        case actionTypes.CHANGE_PERSONEL:
            return produce(state, draft => {
                draft.post.selectedPersonel = payload.data;
                draft.post.id_personel = payload.data ? payload.data.value : '';
            })
        
        case actionTypes.CHANGE_JENISGAMBAR:
            return produce(state, draft => {
                draft.post.selectedJenisGambar = payload.data;
                draft.post.id_jenis_gambar_personel = payload.data ? payload.data.value : '';
            })
        
        case actionTypes.CHANGE_IMAGE:
            return produce(state, draft => {
                draft.post.file = payload.data.file;
                draft.post.imageUrl = payload.data.imageUrl;
            })

        case actionTypes.GET_UPLOADGAMBAR_DETAIL_SUCCESS:
            return produce(state, draft => {
                if (payload.data.id) {
                    draft.post.id = payload.data.id;
                    draft.post.id_jenis_gambar_personel = payload.data.id_jenis_gambar_personel;
                    draft.post.id_personel = payload.data.id_personel;
                    draft.post.imageUrl = payload.data.image;
                    draft.post.selectedPersonel = {
                        value: payload.data.id_personel,
                        label: payload.data.nama_personel
                    };
                    draft.post.selectedJenisGambar = {
                        value: payload.data.id_jenis_gambar_personel,
                        label: payload.data.nama_jenis_gambar
                    };
                } else {
                    draft.post.id = 0;
                    draft.post.imageUrl = '';
                }
            })
        
        case actionTypes.DELETE_UPLOADGAMBAR_SUCCESS:
            return produce(state, draft => {
                draft.post.id = 0;
                draft.post.imageUrl = '';
            })

        default:
            return state;
    }
}

export { moduleReducer, filterReducer, uploadGambarReducer }
