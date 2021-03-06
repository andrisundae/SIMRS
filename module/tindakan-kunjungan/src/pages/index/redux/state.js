export default {
  data: {
    kunjungan: [],
    unitLayanan: [],
    penjamin: [],
    pelaksana: [],
    pelaksanaKomponen: [],
  },
  post: {
    id_pasien: '',
    nama_pasien: '',
    nama_ortu: '',
    norm: '',
    alamat: '',
    jenis_kelamin: '',
    id_dpjp: '',
    id_unit_layanan: '',
    id_instalasi: '',
    nama_unit_layanan: '',
    nama_instalasi: '',
    id_kunjungan_unit: '',
    umur: '',
    tgl_lahir: '',
    st_pulang: '',
    id: '',
    nama_status_pasien: '',
    nama_hak_kelas: '',
    nama_kelas: '',
    id_kelas: '',
    nama_dpjp: '',
    id_penjamin: '',
    kode_kunjungan_unit: '',
    keringanan: 0,
    bayar: 0,
    pengembalian: 0,
    biaya: 0,
    total_biaya: 0,
  },
  postItem: {
    id: '',
    biaya: 0,
    total_biaya: 0,
    id_kelas: '',
    id_kelompok: '',
    id_tindakan: '',
    id_pelaksana: '',
    jumlah: 0,
    id_layanan: '',
    id_unit_layanan: '',
    nama_kelas: '',
    nama_layanan: '',
    nama_pelaksana: '',
    nama_petugas_input: '',
    nama_unit_layanan: '',
    tanggal: '',
    jam: '',
    harga: 0,
    st_kunjungan: 0,
    nama_kelompok: '',
    kode_panggil: '',
    st_tarif_manual: 0,
  },
  selectedOption: {
    id_pelaksana: null,
  },
  focusElement: '',
  selectedRow: 0,
  statusForm: '',
  loaderDpjp: false,
  showCariKunjungan: false,
  showCariTindakan: false,
  saveSuccess: false,
  showPelaksanaTambahan: false,
  showPelaksanaKomponen: false,
  isRequestingPasien: false,
  isFromAntrian: false,
};
