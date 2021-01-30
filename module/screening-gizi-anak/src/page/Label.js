const ScreeningGiziAnakLabel = {
  headerLabel: 'Screening Gizi Anak',
  descriptionLabel: '',
  formLabel: [
    {
      key: 'berat',
      label: 'Pasien mengalami penurunan BB selama 1 bulan terakhir',
    },
    { key: 'kurus', label: 'Pasien tampak kurus' },
    { key: 'kondisi', label: 'Kondisi pasien' },
    {
      key: 'penyakit',
      label:
        'Terdapat penyakit atau keadaan yang mengakibatkan pasien berisiko mengalami malnutrisi',
    },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
  ],
  berat: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Berdasarkan penilaian objektif data BB', value: 1 },
    {
      key: 2,
      text: 'Berdasarkan penilaian subjektif orang tua pasien',
      value: 1,
    },
    {
      key: 3,
      text:
        'BB tidak naik selama 3 bulan terakhir (khusus untuk bayi < 1 tahun)',
      value: 1,
    },
  ],
  kurus: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1 },
  ],
  kondisi: [
    { key: 0, text: 'Tidak ada diare atau muntah', value: 0 },
    { key: 1, text: 'Diare ≥ 5x sehari', value: 1 },
    { key: 2, text: 'Muntah > 3x sehari dalam 1 minggu', value: 1 },
    {
      key: 3,
      text: 'Diare ≥ 5x sehari dan/atau muntah > 3x sehari dalam 1 minggu',
      value: 1,
    },
    {
      key: 4,
      text: 'Asupan makan berkurang selama 1 minggu terakhir',
      value: 1,
    },
  ],
  penyakit: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 2 },
  ],
};

export default ScreeningGiziAnakLabel;
