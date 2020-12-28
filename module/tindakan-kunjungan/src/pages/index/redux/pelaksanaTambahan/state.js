export default {
  data: {
    spesialisasi: [],
    pelaksana: [],
  },
  post: {
    id: '',
    tgl: '',
    id_kunjungan_unit_detail: '',
    id_pelaksana: '',
    id_spesialisasi: '',
    st_utama: 0,
    nama_pelaksana: '',
    nama_spesialisasi: '',
  },
  selectedOption: {
    id_pelaksana: null,
    id_spesialisasi: null,
  },
  focusElement: '',
  statusForm: '',
  loaderPelaksana: false,
  saveSuccess: false,
};
