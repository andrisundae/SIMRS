const ScreeningDecubitusNortonScaleLabel = {
  headerLabel: 'Screening Decubitus Norton Scale',
  descriptionLabel: '',
  formLabel: [
    {
      index: 0,
      key: 'fisik',
      label: 'Kondisi fisik secara umum',
      default: 'fisik',
    },
    { index: 1, key: 'kesadaran', label: 'Kesadaran', default: 'kesadaran' },
    { index: 2, key: 'aktifitas', label: 'Aktifitas', default: 'aktifitas' },
    { index: 3, key: 'mobilisasi', label: 'Mobilisasi', default: 'mobilisasi' },
    {
      index: 4,
      key: 'incontinensia',
      label: 'Incontinensia',
      default: 'incontinensia',
    },
    { index: 5, key: 'total', label: 'Total' },
    { index: 6, key: 'kesimpulan', label: 'Kesimpulan' },
  ],
  fisik: [
    { key: 0, text: 'Baik', value: 4, default: true },
    { key: 1, text: 'Cukup', value: 3 },
    { key: 2, text: 'Buruk', value: 2 },
    { key: 3, text: 'Sangan buruk', value: 1 },
  ],
  kesadaran: [
    { key: 0, text: 'Composmentis', value: 4, default: true },
    { key: 1, text: 'Apatis', value: 3 },
    { key: 2, text: 'Confus / Soporus', value: 2 },
    { key: 3, text: 'Stupor / Coma', value: 1 },
  ],
  aktifitas: [
    { key: 0, text: 'Ambulan', value: 4, default: true },
    { key: 1, text: 'Ambulan dengan bantuan', value: 3 },
    { key: 2, text: 'Hanya bisa duduk', value: 2 },
    { key: 3, text: 'Berbaring', value: 1 },
  ],
  mobilisasi: [
    { key: 0, text: 'Dapat bergerak bebas', value: 4, default: true },
    { key: 1, text: 'Sedikit terbatas', value: 3 },
    { key: 2, text: 'Sangat terbatas', value: 2 },
    { key: 3, text: 'Tidak dapat bergerak', value: 1 },
  ],
  incontinensia: [
    { key: 0, text: 'Tidak ada', value: 4, default: true },
    { key: 1, text: 'Kadang-kadang', value: 3 },
    { key: 2, text: 'Sering Incontinensia Urine', value: 2 },
    { key: 3, text: 'Incontinesia Alvi & Urine', value: 1 },
  ],
};

export default ScreeningDecubitusNortonScaleLabel;
