import produce from 'immer';
import { includes } from 'lodash';
import dayjs from 'dayjs';
import initialState from './state';
import actionTypes from './actionTypes';
import { staticConst } from './static';

const defaultJenisUmur = (data) => {
  return data.length > 0 ? data[0] : { label: 'Tahun', value: 'year' };
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    const jenisUmur = defaultJenisUmur(state.data.options_umur);
    const now = dayjs();
    const toDateNow = now.toDate();

    switch (type) {
        case actionTypes.CHANGE_INPUT:
            draft.post[payload.data.name] = payload.data.value;
            draft.focusElement = '';

            if (payload.data.name === staticConst.UMUR) {
                draft.post.tgl_lahir = dayjs().subtract(payload.data.value, state.post.jenis_umur).toDate();
            } else if (payload.data.name === staticConst.TGL_LAHIR) {
                const tglLahir = dayjs(payload.data.value);
                draft.post.umur = now.diff(tglLahir, 'year');
                draft.post.jenis_umur = jenisUmur.value;
                draft.selectedOption.jenis_umur = jenisUmur;
            }
            return

        case actionTypes.SAVE_SUCCESS:
            const {id, id_pasien: idPasien} = payload.data;
            draft.statusForm = actionTypes.SELECTED;
            draft.post = {
                ...state.post,
                id,
                id_pasien: idPasien,
            }

            return

        case actionTypes.ON_FOCUS_ELEMENT:
            draft.focusElement = payload.element;
            return

        case actionTypes.TOGGLE_SHOW_CARI_PASIEN:
            draft.showCariPasien = !state.showCariPasien;
            return
        
        case actionTypes.TOGGLE_SHOW_CARI_WILAYAH:
            draft.showCariWilayah = !state.showCariWilayah;
            return
        
        case actionTypes.TOGGLE_SHOW_CARI_KUNJUNGAN:
            draft.showCariKunjungan = !state.showCariKunjungan;
            return

        case actionTypes.TOGGLE_SHOW_NORM_MODAL:
            draft.showNormModal = !state.showNormModal;
            return

        case actionTypes.POPULATE_FORM_SUCCESS:
            draft.data.options_jenis_kelamin = payload.data.jenis_kelamin;
            draft.data.options_kelas = payload.data.kelas;
            draft.data.options_penjamin = payload.data.penjamin;
            draft.data.options_asal_masuk = payload.data.asal_masuk;
            draft.data.options_kelompok = payload.data.kelompok;
            draft.data.options_asal_masuk_detail = payload.data.asal_masuk_detail;
            draft.data.options_instalasi = payload.data.instalasi;
            draft.data.options_unit_layanan = payload.data.unit_layanan;
            draft.data.options_umur = payload.data.jenis_umur;
            draft.data.options_status_kepersetaan = payload.data.status_kepersetaan;
            draft.data.options_status_pasien_default = payload.data.status_pasien;
            draft.data.options_status_pasien = payload.data.status_pasien;
            return
        
        case actionTypes.CHANGE_SELECT2:
            draft.post[payload.name] = payload.data.value;
            draft.selectedOption[payload.name] = payload.data;
            if (payload.name === 'id_penjamin_pasien' && payload.data) {
                draft.post.id_penjamin = '';
                draft.selectedOption.id_penjamin = null;
                draft.post.penjamin_pasien = '';
                draft.data.options_status_pasien = [
                    payload.data,
                    ...draft.data.options_status_pasien_default,
                ];
            } else if (payload.name === 'id_penjamin' && payload.data) {
                if (payload.data.label.toUpperCase() === staticConst.UMUM) {
                    draft.post.penjamin_pasien = staticConst.BAYAR_SENDIRI;
                } else {
                    draft.post.penjamin_pasien = payload.data.label.toUpperCase();
                }
            } else if (payload.name === 'id_asal_masuk' && payload.data && draft.selectedOption.id_asal_masuk_detail) {
                draft.post.id_asal_masuk_detail = '';
                draft.selectedOption.id_asal_masuk_detail = null;
            } else if (payload.name === 'id_kelompok' || payload.name === 'id_instalasi' || payload.name === 'id_unit_layanan') {
                if (payload.name === 'id_kelompok') {
                    draft.post.id_instalasi = '';
                    draft.selectedOption.id_instalasi = null;
                }

                if (payload.name !== 'id_unit_layanan') {
                    draft.post.id_unit_layanan = '';
                    draft.selectedOption.id_unit_layanan = null;
                }

                draft.post.id_kelas_kamar = '';
                draft.selectedOption.id_kelas_kamar = null;

                draft.post.id_dpjp = '';
                draft.selectedOption.id_dpjp = null;

                draft.data.options_kelas_kamar = [];
                draft.data.options_dpjp = [];

                Object.keys(state.data.jenis_klasifikasi_registrasi).forEach(key => {
                    draft.selectedOption[key] = null;
                })

                draft.data.jenis_klasifikasi_registrasi = {};
                draft.post.id_tindakan = [];

                if (payload.name === 'id_instalasi') {
                    if (payload.data.alias_jenis_layanan !== staticConst.RAWAT_INAP_ALIAS) {
                        const findNonKelas = state.data.options_kelas.find(row => row.value === staticConst.ID_NON_KELAS);
                        draft.post.id_kelas = staticConst.ID_NON_KELAS;
                        draft.post.nama_non_kelas = findNonKelas ? findNonKelas.label : '';
                    }
                }
            }

            if (payload.isTindakan) {
                const selectedTindakan = state.post.id_tindakan;
                const selectedData = {
                    name: payload.name,
                    value: payload.name === 'id_kelas' ? payload.data.id_tindakan : payload.data.value
                };
                const findIndex = selectedTindakan.findIndex(row => row.name === payload.name);
                if (findIndex >= 0) {
                    selectedTindakan[findIndex] = selectedData;
                } else {
                    selectedTindakan.push(selectedData)
                }
                draft.post.id_tindakan = selectedTindakan;
            }
            return
        
        case actionTypes.ASAL_MASUK_DETAIL_REQUEST:
            draft.loaderAsalMasukDetail = true;
            return
        case actionTypes.ASAL_MASUK_DETAIL_SUCCESS:
            draft.data.options_asal_masuk_detail = payload.data;
            draft.loaderAsalMasukDetail = false;
            return
        case actionTypes.ASAL_MASUK_DETAIL_FAILURE:
            draft.loaderAsalMasukDetail = false;
            return

        case actionTypes.INSTALASI_REQUEST:
            draft.loaderInstalasi = true;
            return
        case actionTypes.INSTALASI_SUCCESS:
            draft.data.options_instalasi = payload.data;
            draft.loaderInstalasi = false;
            return
        case actionTypes.INSTALASI_FAILURE:
            draft.loaderInstalasi = false;
            return

        case actionTypes.UNIT_LAYANAN_REQUEST:
            draft.loaderUnitLayanan = true;
            return
        case actionTypes.UNIT_LAYANAN_SUCCESS:
            draft.data.options_unit_layanan = payload.data;
            draft.loaderUnitLayanan = false;
            return
        case actionTypes.UNIT_LAYANAN_FAILURE:
            draft.loaderUnitLayanan = false;
            return
        
        case actionTypes.OPTIONS_BY_UNITLAYANAN_REQUEST:
            draft.loaderOptionsByUnitLayanan = true;
            return
        case actionTypes.OPTIONS_BY_UNITLAYANAN_SUCCESS:
            draft.data.options_kelas_kamar = payload.data.kelas_kamar;
            draft.data.options_dpjp = payload.data.dpjp;
            draft.data.jenis_klasifikasi_registrasi = payload.data.jenis_klasifikasi_registrasi;
            draft.data.options_asal_kunjungan = payload.data.asal_kunjungan;
            draft.loaderOptionsByUnitLayanan = false;

            Object.keys(payload.data.jenis_klasifikasi_registrasi).forEach(key => {
                draft.selectedOption[key] = null;
            })

            return
        case actionTypes.OPTIONS_BY_UNITLAYANAN_FAILURE:
            draft.loaderOptionsByUnitLayanan = false;
            return

        case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_REQUEST:
            draft.loaderJenisKlasifikasiRegistrasi = true;
            return
        case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_SUCCESS:
            draft.data.jenisKlasifikasiRegistrasi = payload.data;
            draft.loaderJenisKlasifikasiRegistrasi = false;
            return
        case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_FAILURE:
            draft.loaderJenisKlasifikasiRegistrasi = false;
            return

        case actionTypes.FILTER_CHANGE_PASIEN:
            draft.filterPasien.post[payload.data.name] = payload.data.value;
            return
        case actionTypes.FILTER_CHANGE_WILAYAH:
            draft.filterWilayah.post[payload.data.name] = payload.data.value;
            return
        case actionTypes.CANCEL:
        case actionTypes.FINISH:
        case actionTypes.READY:
            draft.statusForm = actionTypes.READY;
            draft.filterPasien.selected = {};
            draft.post = { ...initialState.post};
            draft.selectedOption = {...initialState.selectedOption};
            draft.data.jenis_klasifikasi_registrasi = {};
            return
        case actionTypes.ADD:
            draft.statusForm = actionTypes.ADD;
            draft.post.tgl_lahir = toDateNow;
            draft.post.tgl_kunjungan = toDateNow;
            draft.post.tgl_jaminan = toDateNow;
            draft.post.tgl_cetak_jaminan = toDateNow;
            draft.post.jam_kunjungan = toDateNow;

            draft.post.jenis_umur = jenisUmur.value;
            draft.selectedOption.jenis_umur = jenisUmur;
            return

        case actionTypes.FILTER_SELECTED_PASIEN:
            const data = payload.data;
            draft.statusForm = actionTypes.SELECTED;
            draft.filterPasien.selected = data;
            draft.post = {
                ...state.post,
                id_pasien: data.pasien_id,
                nama: data.nama,
                norm: data.norm,
                alamat: data.alamat,
                kecamatan: data.kecamatan,
                kota: data.kota,
                provinsi: data.provinsi,
                desa: data.desa,
                id_desa: data.id_desa,
                rt: data.rt,
                rw: data.rw,
                nama_ortu: data.nama_ortu,
                id_jenis_kelamin: data.jenis_kelamin_id,
                tgl_lahir: dayjs(data.tgl_lahir).toDate()
            };

            draft.selectedOption.id_jenis_kelamin = {
                value: data.jenis_kelamin_id,
                label: data.jenis_kelamin
            }
            return
        
        case actionTypes.FILTER_SELECTED_WILAYAH:
            draft.post = {
                ...state.post,
                ...payload.data
            };

            return

        case actionTypes.ADD_WITH_SELECTED:
            draft.statusForm = actionTypes.ADD_WITH_SELECTED;
            draft.post = {
                ...state.post,
                tgl_kunjungan: toDateNow,
                tgl_jaminan: toDateNow,
                tgl_cetak_jaminan: toDateNow,
                jam_kunjungan: toDateNow,
                id_asal_masuk: '',
                id_asal_masuk_detail: '',
                id_penjamin: '',
                id_kelompok: '',
                id_instalasi: '',
                id_tindakan: [],
                id_dpjp: '',
                id_unit_layanan: '',
                id_kelas: '',
                penjamin_pasien: '',
                nama_non_kelas: '',
            }
            draft.data = {
                ...state.data,
                jenis_klasifikasi_registrasi: {}
            }
            draft.selectedOption = {
                ...state.selectedOption,
                id_kelompok: null,
                id_instalasi: null,
                id_asal_masuk: null,
                id_asal_masuk_detail: null,
                id_unit_layanan: null,
                id_kelas: null,
                id_penjamin: null,
            }
            return
        case actionTypes.CANCEL_WITH_SELECTED:
            draft.statusForm = actionTypes.SELECTED;
            return

        case actionTypes.NEXT_NORM_SUCCESS:
            draft.post.norm = payload.data;
            return
        default:
            return state;
    }
  });

export const statusesElements = {
  [actionTypes.READY]: ['norm', 'search', 'add', 'exit'],
  [actionTypes.SELECTED]: ['add', 'edit', 'delete', 'preview', 'finish'],
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

export const isDisable = (element, status) => {
  if (statusesElements[status]) {
    if (includes(statusesElements[status], element)) {
      return false;
    }
    return true;
  }

  return true;
};
