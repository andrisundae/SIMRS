export default {
  data: {
    options_setting_kelas_penjamin: [],
    options_status_pasien_default: [],
  },
  post: {
    id_penjamin: '',
    nomor_anggota: '',
    id_kelas_penjamin_pasien: '',
    id_kepersertaan: '',
    nama_penanggung_jawab: '-',
    aktif: 0,
  },
  selectedOption: {
    id_kelas_penjamin_pasien: null,
    id_kepersertaan: null,
    id_penjamin: null,
  },
  focusElement: '',
  statusForm: '',
  loaderSettingKelasPenjamin: false,
};
