import React from 'react';

const ScreeningJatuhAnakLabel = {
  headerLabel: 'Screening Resiko Jatuh',
  descriptionLabel: 'Humpty Dumpy (Anak)',
  formLabel: [
    { key: 'umur', label: 'Umur' },
    { key: 'jenis_kelamin', label: 'Jenis Kelamin' },
    {
      key: 'perubahan_oksigenasi',
      label: (
        <div>
          Perubahan dalam Oksigenasi
          <br />
          (masalah saluran nafas, dehidrasi, anemia, anoreksia sinkop / sakit
          kepala, dll)
        </div>
      ),
    },
    { key: 'diagnosis', label: 'Diagnosis' },
    { key: 'gangguan_kognitif', label: 'Gangguan Kognitif' },
    { key: 'faktor_lingkungan', label: 'Faktor Lingkungan' },
    {
      key: 'respon',
      label: 'Respon terhadap Operasi / Obat Penenang / Efek Anastesi',
    },
    { key: 'penggunaan_obat', label: 'Penggunaan Obat' },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
    { key: 'intervensi', label: 'Intervensi' },
  ],
  umur: [
    { key: 0, text: 'Di bawah 3 tahun', value: 4 },
    { key: 1, text: '3 - 7 tahun', value: 3 },
    { key: 2, text: '7 - 14 tahun', value: 2 },
    { key: 3, text: '> 14 tahun', value: 1 },
  ],
  jenisKelamin: [
    { key: 0, text: 'Laki-laki', value: 2 },
    { key: 1, text: 'Perempuan', value: 1 },
  ],
  perubahanOksigenasi: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 3 },
  ],
  diagnosis: [
    { key: 0, text: 'Kelainan psikis / perilaku', value: 2 },
    { key: 1, text: 'Diagnosis lain', value: 1 },
    { key: 2, text: 'Tidak semua', value: 0 },
  ],
  gangguanKognitif: [
    { key: 0, text: 'Tidak sadar terhadap keterbatasan', value: 3 },
    { key: 1, text: 'Lupa keterbatasan', value: 2 },
    { key: 2, text: 'Mengetahui kemampuan diri', value: 1 },
    { key: 3, text: 'Tidak semua', value: 0 },
  ],
  faktorLingkungan: [
    { key: 0, text: 'Riwayat jatuh dari TT saat bayi / anak', value: 4 },
    { key: 1, text: 'Pasien menggunakan alat bantu / box / mebel', value: 3 },
    { key: 2, text: 'Pasien berada di tempat tidur', value: 2 },
    { key: 3, text: 'Pasien di luar ruangan rawat', value: 1 },
    { key: 4, text: 'Tidak semua', value: 0 },
  ],
  respon: [
    { key: 0, text: 'Dalam 24 jam', value: 3 },
    { key: 1, text: 'Dalam 48 jam', value: 2 },
    { key: 2, text: '> 48 jam', value: 1 },
    { key: 3, text: 'Tidak operasi', value: 0 },
  ],
  penggunaanObat: [
    {
      key: 0,
      text:
        'Bermacam-macam obat yang digunakan: obat sedative (kecuali pasien ICU yang menggunakan sedasi dan paralisis), hipnotik, barbiturate, fenotiazin, antidepresan, laksans / diuretik, narkotik',
      value: 3,
    },
    { key: 1, text: 'Salah satu dari pengobatan di atas', value: 2 },
    { key: 2, text: 'Pengobatan lain', value: 1 },
    { key: 3, text: 'Tidak semua', value: 0 },
  ],
  intervensi: {
    between7and11: [
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
    above11: [
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

export default ScreeningJatuhAnakLabel;
