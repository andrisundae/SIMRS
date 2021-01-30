const ScreeningGiziObstetriLabel = {
  headerLabel: 'Screening Gizi Obstetri',
  descriptionLabel: '',
  formLabel: [
    {
      key: 'berat',
      label: 'Ada pertambahan BB yang kurang atau lebih selama kehamilan',
    },
    { key: 'makan', label: 'Asupan makan berkurang karena nafsu makan' },
    { key: 'darah', label: 'Nilai HB < 10 g/dl atau HCT < 30%' },
    { key: 'kondisi', label: 'Gangguan metabolisme / kondisi khusus' },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
  ],
  berat: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1 },
  ],
  makan: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1 },
  ],
  darah: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1 },
  ],
  kondisi: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 3 },
  ],
};

export default ScreeningGiziObstetriLabel;
