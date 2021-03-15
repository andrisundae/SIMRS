const ScreeningStatusMentalGeriatriLabel = {
  headerLabel: 'Screening Status Mental Geriatri',
  descriptionLabel: '',
  formLabel: [
    {
      index: 0,
      key: 'tanggal_berapa',
      label: 'Tanggal berapa sekarang (tanggal, bulan dan tahun)',
      default: 'tanggalBerapa',
    },
    { index: 1, key: 'hari', label: 'Hari apa sekarang', default: 'hari' },
    {
      index: 2,
      key: 'tempat',
      label: 'Apa nama tempat ini',
      default: 'tempat',
    },
    {
      index: 3,
      key: 'telepon',
      label:
        'Berapa nomor telepon anda (tanyakan alamat tinggal jika tidak memiliki telepon)',
      default: 'telepon',
    },
    { index: 4, key: 'umur', label: 'Berapa umur anda', default: 'umur' },
    { index: 5, key: 'lahir', label: 'Kapan anda lahir', default: 'lahir' },
    {
      index: 6,
      key: 'presiden_sekarang',
      label: 'Siapa presiden Indonesia sekarang',
      default: 'presidenSekarang',
    },
    {
      index: 7,
      key: 'presiden_sebelumnya',
      label: 'Siapa presiden Indonesia sebelumnya',
      default: 'presidenSebelumnya',
    },
    {
      index: 8,
      key: 'nama_kecil',
      label: 'Siapa nama kecil ibu anda',
      default: 'namaKecil',
    },
    {
      index: 9,
      key: 'kurangi',
      label:
        'Kurangi 3 dari angka 20, kemudian kurangi 3 lagi sampai angka pertama',
      default: 'kurangi',
    },
    { index: 10, key: 'total', label: 'Total' },
    { index: 11, key: 'kesimpulan', label: 'Kesimpulan' },
  ],
  tanggalBerapa: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  hari: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  tempat: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  telepon: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  umur: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  lahir: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  presidenSekarang: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  presidenSebelumnya: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  namaKecil: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
  kurangi: [
    { key: 0, text: 'Salah', value: 1 },
    { key: 1, text: 'Benar', value: 0, default: true },
  ],
};

export default ScreeningStatusMentalGeriatriLabel;
