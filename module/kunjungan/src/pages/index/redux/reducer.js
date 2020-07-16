import produce from 'immer';
import dayjs from 'dayjs';
import initialState from './state';
import actionTypes from './actionTypes';
import { staticConst } from '../static';

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
      case actionTypes.CHANGE_INPUT: {
        draft.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';

        if (payload.data.name === staticConst.UMUR) {
          draft.post.tgl_lahir = dayjs()
            .subtract(payload.data.value, state.post.jenis_umur)
            .toDate();
        } else if (payload.data.name === staticConst.TGL_LAHIR) {
          const tglLahir = dayjs(payload.data.value);
          draft.post.umur = now.diff(tglLahir, 'year');
          draft.post.jenis_umur = jenisUmur.value;
          draft.selectedOption.jenis_umur = jenisUmur;
        }
        return;
      }

      case actionTypes.SAVE_SUCCESS: {
        const {
          id,
          id_pasien: idPasien,
          kunjungan_unit: { id: idKunjunganUnit },
        } = payload.data.data;
        draft.statusForm = actionTypes.SELECTED;
        draft.post = {
          ...state.post,
          id,
          id_pasien: idPasien,
          id_kunjungan_unit: idKunjunganUnit,
        };

        return;
      }

      case actionTypes.ON_FOCUS_ELEMENT:
        draft.focusElement = payload.element;
        return;

      case actionTypes.TOGGLE_SHOW_CARI_PASIEN:
        draft.showCariPasien = !state.showCariPasien;
        return;

      case actionTypes.TOGGLE_SHOW_CARI_WILAYAH:
        draft.showCariWilayah = !state.showCariWilayah;
        return;

      case actionTypes.TOGGLE_SHOW_CARI_KUNJUNGAN:
        draft.showCariKunjungan = !state.showCariKunjungan;
        return;

      case actionTypes.TOGGLE_SHOW_NORM_MODAL:
        draft.showNormModal = !state.showNormModal;
        return;

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
        return;

      case actionTypes.CHANGE_SELECT2: {
        draft.focusElement = '';
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
        } else if (
          payload.name === 'id_asal_masuk' &&
          payload.data &&
          draft.selectedOption.id_asal_masuk_detail
        ) {
          draft.post.id_asal_masuk_detail = '';
          draft.selectedOption.id_asal_masuk_detail = null;
        } else if (
          payload.name === 'id_kelompok' ||
          payload.name === 'id_instalasi' ||
          payload.name === 'id_unit_layanan'
        ) {
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

          Object.keys(state.data.jenis_klasifikasi_registrasi).forEach(
            (key) => {
              draft.selectedOption[key] = null;
            }
          );

          draft.data.jenis_klasifikasi_registrasi = {};
          draft.post.id_tindakan = [];

          if (payload.name === 'id_instalasi') {
            if (
              payload.data.alias_jenis_layanan !== staticConst.RAWAT_INAP_ALIAS
            ) {
              const findNonKelas = state.data.options_kelas.find(
                (row) => row.value === staticConst.ID_NON_KELAS
              );
              draft.post.id_kelas = staticConst.ID_NON_KELAS;
              draft.post.nama_non_kelas = findNonKelas
                ? findNonKelas.label
                : '';
            }
          }
        }

        if (payload.isTindakan) {
          const selectedTindakan = state.post.id_tindakan;
          const selectedData = {
            name: payload.name,
            value:
              payload.name === 'id_kelas'
                ? payload.data.id_tindakan
                : payload.data.value,
          };
          const findIndex = selectedTindakan.findIndex(
            (row) => row.name === payload.name
          );
          if (findIndex >= 0) {
            selectedTindakan[findIndex] = selectedData;
          } else {
            selectedTindakan.push(selectedData);
          }
          draft.post.id_tindakan = selectedTindakan;
        }
        return;
      }

      case actionTypes.ASAL_MASUK_DETAIL_REQUEST:
        draft.loaderAsalMasukDetail = true;
        return;
      case actionTypes.ASAL_MASUK_DETAIL_SUCCESS:
        draft.data.options_asal_masuk_detail = payload.data;
        draft.loaderAsalMasukDetail = false;
        return;
      case actionTypes.ASAL_MASUK_DETAIL_FAILURE:
        draft.loaderAsalMasukDetail = false;
        return;

      case actionTypes.INSTALASI_REQUEST:
        draft.loaderInstalasi = true;
        return;
      case actionTypes.INSTALASI_SUCCESS:
        draft.data.options_instalasi = payload.data;
        draft.loaderInstalasi = false;
        return;
      case actionTypes.INSTALASI_FAILURE:
        draft.loaderInstalasi = false;
        return;

      case actionTypes.UNIT_LAYANAN_REQUEST:
        draft.loaderUnitLayanan = true;
        return;
      case actionTypes.UNIT_LAYANAN_SUCCESS:
        draft.data.options_unit_layanan = payload.data;
        draft.loaderUnitLayanan = false;
        return;
      case actionTypes.UNIT_LAYANAN_FAILURE:
        draft.loaderUnitLayanan = false;
        return;

      case actionTypes.OPTIONS_BY_UNITLAYANAN_REQUEST:
        draft.loaderOptionsByUnitLayanan = true;
        return;
      case actionTypes.OPTIONS_BY_UNITLAYANAN_SUCCESS: {
        draft.data.options_kelas_kamar = payload.data.kelas_kamar;
        draft.data.options_dpjp = payload.data.dpjp;
        draft.data.jenis_klasifikasi_registrasi =
          payload.data.jenis_klasifikasi_registrasi;
        draft.data.options_asal_kunjungan = payload.data.asal_kunjungan;
        draft.loaderOptionsByUnitLayanan = false;

        Object.keys(payload.data.jenis_klasifikasi_registrasi).forEach(
          (key) => {
            draft.selectedOption[key] = null;
          }
        );

        //Jika ada asal kunjungan cuman satu lgsung di select
        if (payload.data.asal_kunjungan.length === 1) {
          draft.post.id_kunjungan_asal = payload.data.asal_kunjungan[0].value;
          draft.post.id_kunjungan_unit_asal =
            payload.data.asal_kunjungan[0].id_kunjungan_unit;
          draft.selectedOption.id_kunjungan_asal =
            payload.data.asal_kunjungan[0];
        }

        return;
      }
      case actionTypes.OPTIONS_BY_UNITLAYANAN_FAILURE:
        draft.loaderOptionsByUnitLayanan = false;
        return;

      case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_REQUEST:
        draft.loaderJenisKlasifikasiRegistrasi = true;
        return;
      case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_SUCCESS:
        draft.data.jenisKlasifikasiRegistrasi = payload.data;
        draft.loaderJenisKlasifikasiRegistrasi = false;
        return;
      case actionTypes.JENIS_KLASIFIKASI_REGISTRASI_FAILURE:
        draft.loaderJenisKlasifikasiRegistrasi = false;
        return;

      case actionTypes.FILTER_CHANGE_PASIEN:
        draft.filterPasien.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;
      case actionTypes.FILTER_CHANGE_WILAYAH:
        draft.filterWilayah.post[payload.data.name] = payload.data.value;
        draft.focusElement = '';
        return;
      case actionTypes.CANCEL:
      case actionTypes.FINISH:
      case actionTypes.READY:
        draft.statusForm = actionTypes.READY;
        draft.filterPasien.selected = {};
        draft.post = { ...initialState.post };
        draft.selectedOption = { ...initialState.selectedOption };
        draft.data.jenis_klasifikasi_registrasi = {};
        draft.data.kunjungan_terakhir = [];
        draft.temp = { ...initialState.temp };
        draft.focusElement = 'norm';
        return;
      case actionTypes.ADD:
        draft.statusForm = actionTypes.ADD;
        draft.post.tgl_lahir = toDateNow;
        draft.post.tgl_kunjungan = toDateNow;
        draft.post.tgl_jaminan = toDateNow;
        draft.post.tgl_cetak_jaminan = toDateNow;
        draft.post.jam_kunjungan = toDateNow;

        draft.post.jenis_umur = jenisUmur.value;
        draft.selectedOption.jenis_umur = jenisUmur;
        return;

      case actionTypes.SELECTED: {
        const data = payload.data;
        draft.statusForm = actionTypes.SELECTED;
        draft.post = {
          ...state.post,
          id_pasien: data.id,
          nama: data.nama,
          norm: data.norm,
          alamat: data.alamat,
          nama_kecamatan: data.nama_kecamatan,
          nama_kota: data.nama_kota,
          nama_provinsi: data.nama_provinsi,
          nama_desa: data.nama_desa,
          id_desa: data.id_desa,
          rt: data.rt,
          rw: data.rw,
          nama_ortu: data.nama_ortu,
          id_jenis_kelamin: data.id_jenis_kelamin,
          nama_jenis_kelamin: data.nama_jenis_kelamin,
          tgl_lahir: dayjs(data.tgl_lahir).toDate(),
        };

        draft.selectedOption.id_jenis_kelamin = {
          value: data.id_jenis_kelamin,
          label: data.nama_jenis_kelamin,
        };

        return;
      }

      case actionTypes.FILTER_SELECTED_PASIEN:
        draft.statusForm = actionTypes.SELECTED;
        draft.filterPasien.selected = payload.data;

        return;

      case actionTypes.FILTER_SELECTED_WILAYAH: {
        const data = payload.data;
        draft.post = {
          ...state.post,
          nama_kecamatan: data.kecamatan,
          nama_kota: data.kota,
          nama_provinsi: data.provinsi,
          nama_desa: data.desa,
          id_desa: data.id_desa,
        };

        return;
      }

      case actionTypes.ADD_WITH_SELECTED: {
        draft.statusForm = actionTypes.ADD_WITH_SELECTED;
        draft.temp = {
          data: { ...state.data },
          post: { ...state.post },
          selectedOption: { ...state.selectedOption },
        };
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
          id: '',
        };
        draft.data = {
          ...state.data,
          jenis_klasifikasi_registrasi: {},
        };
        draft.selectedOption = {
          ...state.selectedOption,
          id_kelompok: null,
          id_instalasi: null,
          id_asal_masuk: null,
          id_asal_masuk_detail: null,
          id_unit_layanan: null,
          id_kelas: null,
          id_penjamin: null,
          id_dpjp: null,
        };
        return;
      }
      case actionTypes.EDIT:
        draft.statusForm = actionTypes.EDIT;
        draft.temp = {
          data: { ...state.data },
          post: { ...state.post },
          selectedOption: { ...state.selectedOption },
        };
        return;

      case actionTypes.CANCEL_WITH_SELECTED:
        draft.statusForm = actionTypes.SELECTED;
        draft.data = { ...state.temp.data };
        draft.post = { ...state.temp.post };
        draft.selectedOption = { ...state.temp.selectedOption };
        return;

      case actionTypes.GET_DETAIL_RANGKAIAN_KUNJUNGAN_SUCCESS:
        draft.detailRangkaianKunjungan = payload.data;
        return;

      case actionTypes.NEXT_NORM_SUCCESS:
        draft.post.norm = payload.data;
        return;
      case actionTypes.GET_KUNJUNGAN_DETAIL_SUCCESS: {
        const {
          kunjungan,
          tgl_kunjungan,
          id_penjamin,
          tgl_jaminan,
          tgl_cetak_jaminan,
          kunjungan_unit: ku,
          id_kelompok,
          id_instalasi,
          kelompok,
          instalasi,
          jenis_klasifikasi_registrasi: jenisKlasifikasiRegistrasi,
          tindakan,
          id,
        } = payload.data;
        const tglKunjungan = dayjs(tgl_kunjungan).toDate();

        draft.post = {
          ...state.post,
          id,
          kode_kunjungan: kunjungan.kode_kunjungan,
          tgl_kunjungan: tglKunjungan,
          jam_kunjungan: tglKunjungan,
          id_penjamin: id_penjamin,
          tgl_jaminan: dayjs(tgl_jaminan).toDate(),
          tgl_cetak_jaminan: dayjs(tgl_cetak_jaminan).toDate(),
          id_asal_masuk: kunjungan.id_asal_masuk,
          id_asal_masuk_detail: kunjungan.id_asal_masuk_detail,
          id_kelompok,
          id_instalasi,
          id_unit_layanan: ku.unit_layanan.id,
          id_dpjp: kunjungan.id_dpjp_registrasi,
          id_tindakan: tindakan
            ? tindakan.map((row) => {
                return {
                  value: row.id,
                  label: row.nama_layanan,
                  tarif: row.tarif,
                  id_jenis_klasifikasi: row.id_jenis_klasifikasi,
                };
              })
            : [],
          penjamin_pasien: kunjungan.nama_penjamin,
          id_kelas: ku.kelas.id,
          id_kunjungan_unit_asal: ku.id_kunjungan_unit_asal,
          id_kunjungan_asal: kunjungan.id_kunjungan_asal,
          id_kunjungan_unit: ku.id,
        };

        draft.selectedOption.id_asal_masuk = {
          value: kunjungan.id_asal_masuk,
          label: kunjungan.nama_asal_masuk,
        };
        draft.selectedOption.id_asal_masuk_detail = {
          value: kunjungan.id_asal_masuk_detail,
          label: kunjungan.nama_asal_masuk_detail,
          asal_masuk_id: kunjungan.id_asal_masuk,
        };
        draft.selectedOption.id_penjamin = {
          value: kunjungan.id_penjamin,
          label: kunjungan.nama_penjamin,
        };
        draft.selectedOption.id_kelompok = {
          value: id_kelompok,
          label: kelompok.nama,
        };
        draft.selectedOption.id_instalasi = {
          alias_jenis_layanan: instalasi.jenis_layanan.alias,
          jenis_layanan: instalasi.jenis_layanan.id,
          kelompok_id: id_kelompok,
          label: instalasi.nama,
          nama_jenis_layanan: instalasi.jenis_layanan.nama,
          nama_kelompok_jenis_layanan: kelompok.nama,
          value: id_instalasi,
        };
        draft.selectedOption.id_unit_layanan = {
          instalasi_id: id_instalasi,
          label: ku.unit_layanan.nama,
          status_asal_kunjungan: ku.unit_layanan.is_asal_kunjungan,
          value: ku.unit_layanan.id,
        };
        draft.selectedOption.id_dpjp = {
          label: kunjungan.nama_dpjp_registrasi,
          value: kunjungan.id_dpjp_registrasi,
        };

        //Set selected kelas kamar atau nonkelas
        if (instalasi.jenis_layanan.alias !== staticConst.RAWAT_INAP_ALIAS) {
          const findNonKelas = state.data.options_kelas.find(
            (row) => row.value === staticConst.ID_NON_KELAS
          );
          // draft.post.id_kelas = staticConst.ID_NON_KELAS;
          draft.post.nama_non_kelas = findNonKelas ? findNonKelas.label : '';
        } else {
          const findKelasKamar = tindakan.find(
            (row) => row.alias === staticConst.TEMPAT_TIDUR
          );
          if (findKelasKamar) {
            draft.selectedOption.id_kelas = {
              label: ku.kelas.nama,
              value: ku.kelas.id,
              id_tindakan: findKelasKamar.id,
              tarif: findKelasKamar.tarif,
            };
          }
        }

        // Set selected biaya tambahan
        draft.data.jenis_klasifikasi_registrasi = jenisKlasifikasiRegistrasi;
        Object.keys(jenisKlasifikasiRegistrasi).forEach((key) => {
          const findTindakan = tindakan.find(
            (row) =>
              jenisKlasifikasiRegistrasi[key].id_jenis_klasifikasi ===
              row.id_jenis_klasifikasi
          );
          if (findTindakan) {
            draft.selectedOption[key] = {
              value: findTindakan.id,
              label: findTindakan.nama_layanan,
              tarif: findTindakan.tarif,
              id_jenis_klasifikasi: findTindakan.id_jenis_klasifikasi,
            };
          } else {
            draft.selectedOption[key] = null;
          }
        });

        //Set select asal kunjungan
        if (kunjungan.id_kunjungan_asal) {
          draft.selectedOption.id_kunjungan_asal = {
            label: ku.nama_unit_layanan_asal,
            value: kunjungan.id_kunjungan_asal,
            tgl_kunjungan: kunjungan.tgl_kunjungan_asal,
            id_kunjungan_unit: ku.id,
          };
        }

        return;
      }
      case actionTypes.GET_PENJAMIN_PASIEN_SUCCESS: {
        const { aktif_penjamin: aktifPenjamin } = payload.data;
        if (aktifPenjamin) {
          draft.post = {
            ...state.post,
            id_penjamin_pasien: aktifPenjamin.id_penjamin,
            nomor_anggota: aktifPenjamin.nomor_anggota,
            id_kelas_penjamin_pasien: aktifPenjamin.kelas
              ? aktifPenjamin.kelas.id
              : undefined,
            id_kepersertaan: aktifPenjamin.id_kepersertaan,
          };

          draft.selectedOption.id_penjamin_pasien = {
            label: aktifPenjamin.penjamin.nama,
            value: aktifPenjamin.id_penjamin,
          };

          draft.selectedOption.id_kelas_penjamin_pasien = {
            label: aktifPenjamin.kelas.nama,
            value: aktifPenjamin.kelas.id,
            alias: aktifPenjamin.kelas.alias,
          };

          const findKepesertaan = state.data.options_status_kepersetaan.find(
            (row) => row.value === aktifPenjamin.id_kepersertaan
          );
          draft.selectedOption.id_kepersertaan = {
            label: findKepesertaan ? findKepesertaan.label : '',
            value: aktifPenjamin.id_kepersertaan,
          };
        }

        draft.data.options_status_pasien = [
          ...payload.data.penjamin_pasien_options,
          ...draft.data.options_status_pasien_default,
        ];
        return;
      }

      case actionTypes.GET_KUNJUNGAN_TERAKHIR_SUCCESS: {
        draft.data.kunjungan_terakhir = payload.data.map((row) => {
          return {
            ...row,
            nama_pasien: state.post.nama,
          };
        });
        return;
      }

      case actionTypes.GET_SETTING_KELAS_PENJAMIN_REQUEST:
        draft.loaderSettingKelasPenjamin = true;
        return;
      case actionTypes.GET_SETTING_KELAS_PENJAMIN_SUCCESS:
        draft.data.options_setting_kelas_penjamin = payload.data;
        draft.loaderSettingKelasPenjamin = false;
        return;
      case actionTypes.GET_SETTING_KELAS_PENJAMIN_FAILURE:
        draft.loaderSettingKelasPenjamin = false;
        return;

      case actionTypes.CHANGE_TAB:
        draft.activeTabIndex = payload.data.activeIndex;
        return;

      default:
        return state;
    }
  });
