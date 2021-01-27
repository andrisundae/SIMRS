import React from 'react';

const ScreeningJatuhGeriatriLabel = {
  headerLabel: 'Screening Resiko Jatuh',
  descriptionLabel: 'Ontario Modified Stratify (Geriatri)',
  formLabel: [
    { key: 'gangguan_gaya_berjalan', label: 'Gangguan gaya berjalan' },
    { key: 'pusing_posisi_tegak', label: 'Pusing / pingsan pada posisi tegak' },
    { key: 'kebingungan_setiap_saat', label: 'Kebingungan setiap saat' },
    { key: 'nokturia', label: 'Nokturia / inkontinensia urine' },
    { key: 'kebingungan_intermiten', label: 'Kebingungan intermiten' },
    { key: 'kelemahan_umum', label: 'Kelemahan umum' },
    {
      key: 'obat_beresiko',
      label: (
        <div>
          Obat berisiko tinggi
          <br />
          (diuretik, narkotik, sedative, anti psikotik, laksatif, vasodilator,
          antiaritmia, antihypertensi, obat hipoglikemi, anti depresan,
          neuroleptik, NSAID)
        </div>
      ),
    },
    {
      key: 'riwayat_jatuh',
      label: 'Riwayat jatuh dalam waktu 12 bulan sebelumnya',
    },
    { key: 'osteoporosis', label: 'Osteoporosis' },
    {
      key: 'gangguan_sensoris',
      label: 'Gangguan pendengaran dan atau penglihatan',
    },
    { key: 'usia', label: 'Usia 70 tahun keatas' },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
    { key: 'intervensi', label: 'Intervensi' },
  ],
  gangguanGayaBerjalan: [
    { key: 0, text: 'Tidak ada', value: 0 },
    { key: 1, text: 'Diseret', value: 4 },
    { key: 2, text: 'Menghentak', value: 4 },
    { key: 3, text: 'Diayun', value: 4 },
  ],
  pusingPosisTegak: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 3 },
  ],
  kebingunganSetiapSaat: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 3 },
  ],
  nokturia: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 3 },
  ],
  kebingunganIntermiten: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 2 },
  ],
  kelemahanUmum: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 2 },
  ],
  obatBeresiko: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 2 },
  ],
  riwayatJatuh: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 2 },
  ],
  osteoporosis: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1 },
  ],
  gangguanSensoris: [
    { key: 0, text: 'Tidak ada', value: 0 },
    { key: 1, text: 'Pendengaran', value: 1 },
    { key: 2, text: 'Penglihatan', value: 1 },
    { key: 3, text: 'Pendengaran dan penglihatan', value: 1 },
  ],
  usia: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1 },
  ],
  intervensi: {
    under11: [
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
    above10: [
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

export default ScreeningJatuhGeriatriLabel;
