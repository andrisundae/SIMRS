export default {
  data: {
    instalasi: [],
    unitLayanan: [],
    penjamin: [],
    dpjp: [],
  },
  post: {
    instalasi_id: '',
    unit_layanan_id: '',
    penjamin_id: '',
    dpjp_id: '',
    nama_pasien: '',
    norm: '',
  },
  selectedOption: {
    instalasi_id: null,
    unit_layanan_id: null,
    penjamin_id: null,
    dpjp_id: null,
  },
  focusElement: '',
  selectedRow: 0,
  statusForm: '',
  loaderDpjp: false,
};
