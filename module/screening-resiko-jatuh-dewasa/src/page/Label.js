const ScreeningJatuhDewasaLabel = {
  headerLabel: 'Screening Resiko Jatuh',
  descriptionLabel: 'Morse Fall Scale (Dewasa)',
  formLabel: [
    { key: 'riwayat_jatuh', label: 'Riwayat Jatuh & Kejang 3 Bulan Terakhir' },
    { key: 'diagnosis_medis', label: 'Diagnosis Medis > 1' },
    { key: 'alat_bantu_jalan', label: 'Alat Bantu Jalan' },
    { key: 'terapi_heparin', label: 'Memakai Terapi Heparin Lock / IV' },
    { key: 'cara_berjalan', label: 'Cara Berjalan / Berpindah' },
    { key: 'status_mental', label: 'Status Mental' },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
    { key: 'intervensi', label: 'Intervensi' },
  ],
  riwayatJatuh: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 25 },
  ],
  diagnosisMedis: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 15 },
  ],
  alatBantuJalan: [
    { key: 0, text: 'Bed Rest / Dibantu Perawat', value: 0 },
    { key: 1, text: 'Penopang, Tongkat / Walker', value: 15 },
    { key: 2, text: 'Furniture', value: 30 },
  ],
  terapiHeparin: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 20 },
  ],
  caraBerjalan: [
    { key: 0, text: 'Normal / Bed Rest / Immobile', value: 0 },
    { key: 1, text: 'Lemah', value: 15 },
    { key: 2, text: 'Terganggu', value: 30 },
  ],
  statusMental: [
    { key: 0, text: 'Orientasi Sesuai Kemampuan Diri', value: 0 },
    { key: 1, text: 'Lupa Keterbatasan Diri', value: 15 },
  ],
  intervensi: {
    between25and50: [
      { key: 0, label: 'Melakukan asesmen ulang risiko jatuh setiap 24 jam.' },
      {
        key: 1,
        label:
          'Memastikan bel mudah dijangkau oleh pasien. Jika ruangan tidak tersedia bel, maka dianjurkan ada 1 orang penunggu pasien.',
      },
      { key: 2, label: 'Mengunci roda (bed rail) pada tempat tidur pasien.' },
      {
        key: 3,
        label: 'Memasang kancing kuning pada gelang identitas pasien.',
      },
      { key: 4, label: 'Menaikkan pengaman tempat tidur pasien.' },
      {
        key: 5,
        label:
          'Memasang tanda risiko pasien jatuh (segitiga kuning) pada bed/standart infus pasien.',
      },
    ],
    above50: [
      { key: 0, label: 'Melakukan asesmen ulang risiko jatuh setiap shift.' },
      {
        key: 1,
        label: 'Melakukan semua pedoman pencegahan untuk risiko rendah.',
      },
      {
        key: 2,
        label:
          'Memasang tanda risiko pasien jatuh (segitiga kuning) pada pintu kamar pasien (jika 1 kamar 1 pasien).',
      },
      { key: 3, label: 'Mengunjungi dan memonitor pasien setiap 1 jam.' },
      {
        key: 4,
        label:
          'Menempatkan pasien di kamar yang paling dekat dengan nurse station (jika memungkinkan).',
      },
    ],
  },
};

export default ScreeningJatuhDewasaLabel;
