const ScreeningNyeriGeriatriLabel = {
  headerLabel: 'Screening Nyeri',
  descriptionLabel: 'Geriatri',
  formLabel: [
    { key: 'skala', label: 'Skala' },
    { key: 'penyebab', label: 'Penyebab Nyeri' },
    { key: 'kualitas', label: 'Kualitas Nyeri' },
    { key: 'lokasi_penyebaran', label: 'Lokasi Nyeri dan/atau Penyebarannya' },
    { key: 'tingkat_nyeri', label: 'Tingkat Nyeri' },
    { key: 'frekuensi', label: 'Frekuensi Nyeri' },
    { key: 'luka', label: 'Luka' },
    { key: 'intervensi', label: 'Intervensi' },
    { key: 'obat_nyeri' },
  ],
  skala: [
    { key: 0, text: 0, value: 'Tidak Nyeri' },
    { key: 1, text: 1, value: 'Dapat ditoleransi (aktifitas tidak terganggu)' },
    {
      key: 2,
      text: 2,
      value: 'Dapat ditoleransi (beberapa aktifitas sedikit terganggu)',
    },
    {
      key: 3,
      text: 3,
      value:
        'Tidak dapat ditoleransi (tapi masih menggunakan telepon, menonton tv atau membaca)',
    },
    {
      key: 4,
      text: 4,
      value:
        'Tidak dapat ditoleransi (tapi dapat menggunakan telepon, menonton tv atau membaca)',
    },
    {
      key: 5,
      text: 5,
      value: 'Tidak dapat ditoleransi (tidak dapat berbicara karena nyeri)',
    },
  ],
  penyebabNyeri: [
    { key: 0, text: 'Benturan', value: 'Benturan' },
    { key: 1, text: 'Ruda Paksa', value: 'Ruda Paksa' },
    { key: 2, text: 'Sayatan', value: 'Sayatan' },
    { key: 3, text: 'lainnya', value: 'lainnya' },
  ],
  kualitasNyeri: [
    { key: 0, text: 'Seperti Diiris', value: 'Seperti Diiris' },
    { key: 1, text: 'Seperti Diremas', value: 'Seperti Diremas' },
    { key: 2, text: 'Seperti Kram', value: 'Seperti Kram' },
    { key: 3, text: 'Seperti Terbakar', value: 'Seperti Terbakar' },
    { key: 4, text: 'Seperti Tertekan', value: 'Seperti Tertekan' },
    {
      key: 5,
      text: 'Seperti Tertimpa Benda Berat',
      value: 'Seperti Tertimpa Benda Berat',
    },
    { key: 6, text: 'Seperti Tertusuk', value: 'Seperti Tertusuk' },
    { key: 7, text: 'lainnya', value: 'lainnya' },
  ],
  frekuensiNyeri: [
    { key: 0, text: 'Hilang timbul', value: 'Hilang timbul' },
    { key: 1, text: 'Jarang', value: 'Jarang' },
    { key: 2, text: 'Terus menerus', value: 'Terus menerus' },
    { key: 3, text: 'lainnya', value: 'lainnya' },
  ],
  intervensi: [
    { key: 0, label: 'Memberikan kompres dingin' },
    { key: 1, label: 'Memberikan kompres panas' },
    { key: 2, label: 'Memperbaiki posisi pasien' },
    { key: 3, label: 'Memijat' },
    { key: 4, label: 'Memperdengarkan musik' },
    { key: 5, label: 'Memberikan tindakan TENS' },
    { key: 6, label: 'Menganjurkan relaksasi dan pernafasan' },
    { key: 7, label: 'Farmakologi' },
  ],
};

export default ScreeningNyeriGeriatriLabel;
