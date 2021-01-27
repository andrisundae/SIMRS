const ScreeningGiziDewasaLabel = {
  headerLabel: 'Screening Gizi Dewasa',
  descriptionLabel: '',
  formLabel: [
    {
      key: 'berat',
      label:
        'Pasien mengalami penurunan BB yang tidak diinginkan dalam 6 bulan terakhir',
    },
    { key: 'makan', label: 'Asupan makan berkurang karena tidak nafsu makan' },
    { key: 'diagnosis', label: 'Pasien dengan diagnosis / kondisi khusus' },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
  ],
  berat: [
    { key: 0, text: 'Tidak ada penurunan', value: 0 },
    {
      key: 1,
      text: 'Tidak tahu berapa Kg menurunnya (baju terasa lebih longgar)',
      value: 2,
    },
    { key: 2, text: 'Penurunan 1-5 Kg', value: 1 },
    { key: 3, text: 'Penurunan 5-10 Kg', value: 2 },
    { key: 4, text: 'Penurunan 11-15 Kg', value: 3 },
    { key: 5, text: 'Penurunan > 15 Kg', value: 4 },
  ],
  makan: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1 },
  ],
};

export default ScreeningGiziDewasaLabel;
