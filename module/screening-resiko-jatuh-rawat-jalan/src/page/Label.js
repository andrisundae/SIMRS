const ScreeningJatuhRawatJalanLabel = {
  headerLabel: 'Screening Resiko Jatuh',
  descriptionLabel: 'Time Up and Go (Rawat Jalan)',
  formLabel: [
    {
      key: 'saat_berjalan',
      label: 'Saat berjalan',
      children: [
        {
          key: 'tidak_seimbang',
          label: 'Gangguan gaya berjalan',
          default: 'tidakSeimbang',
        },
        {
          key: 'alat_bantu',
          label: 'Pusing / pingsan pada posisi tegak',
          default: 'alatBantu',
        },
      ],
    },
    {
      key: 'saat_duduk',
      label: 'Saat duduk, pasien tampak memerlukan penopang',
      default: 'saatDuduk',
    },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
    { key: 'intervensi', label: 'Intervensi' },
  ],
  tidakSeimbang: [
    { key: 0, text: 'Tidak', value: 0, default: true },
    { key: 1, text: 'Ya', value: 1 },
  ],
  alatBantu: [
    { key: 0, text: 'Tidak', value: 0, default: true },
    { key: 1, text: 'Ya', value: 1 },
  ],
  saatDuduk: [
    { key: 0, text: 'Tidak', value: 0, default: true },
    { key: 1, text: 'Ya', value: 1 },
  ],
  intervensi: {
    1: [
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
    2: [
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

export default ScreeningJatuhRawatJalanLabel;
