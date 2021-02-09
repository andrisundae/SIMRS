import React from 'react';

const ScreeningApgarScoreLabel = {
  headerLabel: 'Screening Apgar Score',
  descriptionLabel: '',
  formLabel: {
    kelahiran: [
      { index: 0, key: 'tanggal_lahir', label: 'Lahir tanggal' },
      { index: 1, key: 'kelahiran', label: 'Kelahiran' },
      { index: 2, key: 'keadaan', label: 'Keadaan' },
    ],
    pemeriksaan: [
      { index: 0, key: 'waktu_penilaian', label: 'Waktu pemeriksaan' },
      {
        index: 1,
        key: 'pulse',
        label: 'Frekuensi jantung',
        default: 'frekuensiJantung',
      },
      {
        index: 2,
        key: 'respiration',
        label: 'Usaha bernafas',
        default: 'usahaBernafas',
      },
      { index: 3, key: 'activity', label: 'Tonus otot', default: 'tonusOtot' },
      { index: 4, key: 'grimace', label: 'Reflek', default: 'reflek' },
      {
        index: 5,
        key: 'appearance',
        label: 'Warna kulit',
        default: 'warnaKulit',
      },
      { index: 6, key: 'total', label: 'Total' },
      { index: 7, key: 'kesimpulan', label: 'Kesimpulan' },
      { index: 8, key: 'riwayat_tindakan', label: 'Riwayat Tindakan' },
    ],
    riwayat: [
      { index: 0, key: 'penghanatan', label: 'Penghangatan' },
      { index: 1, key: 'pengaturan_posisi', label: 'Pengaturan posisi' },
      { index: 2, key: 'pengisapan_lendir', label: 'Pengisapan lendir' },
      {
        index: 3,
        key: 'pengeringan_&_penggantian',
        label: 'Pengeringan & penggantian',
      },
      {
        index: 4,
        key: 'pembersihan_jalan_nafas',
        label: 'Pembersihan jalan nafas',
      },
      {
        index: 5,
        key: 'punggung_telapak_kaki',
        label: 'Pemberian rangsangan pada punggung & telapak kaki',
      },
      {
        index: 6,
        key: 'pemberian_oksigen',
        label: (
          <div>
            Pemberian O<sub>2</sub>
          </div>
        ),
      },
      {
        index: 7,
        key: 'pemberian_oksigen_&_vtp',
        label: (
          <div>
            Pemberian O<sub>2</sub> dengan VTP
          </div>
        ),
      },
      { index: 8, key: 'intubasi', label: 'Intubasi' },
      { index: 9, key: 'kompresi_dada', label: 'Kompresi dada' },
      {
        index: 10,
        key: 'pengisapan_cairan_lambung',
        label: 'Pengisapan carian lambung',
      },
      {
        index: 11,
        key: 'medikasi_pada_bayi',
        label: 'Medikasi pada bayi',
        children: [
          {
            index: 0,
            key: 'natrium_bicarbonate',
            label: 'Natrium bicarbonate',
          },
          { index: 1, key: 'glukosa', label: 'Glukosa' },
          { index: 2, key: 'morphin', label: 'Morphin' },
          { index: 3, key: 'lainnya', label: 'Lainnya' },
        ],
      },
    ],
  },
  dataKelahiran: {
    kelahiran: [
      { key: 0, text: 'Tunggal', value: 'Tunggal' },
      { key: 1, text: 'Kembar', value: 'Kembar' },
    ],
    keadaan: [
      { key: 0, text: 'Hidup', value: 'Hidup' },
      {
        key: 1,
        text: 'Meninggal sebelum persalinan',
        value: 'Meninggal sebelum persalinan',
      },
      {
        key: 2,
        text: 'Meninggal dalam persalinan',
        value: 'Meninggal dalam persalinan',
      },
      {
        key: 3,
        text: 'Meninggal setelah persalinan',
        value: 'Meninggal setelah persalinan',
      },
    ],
  },
  dataPemeriksaan: {
    frekuensiJantung: [
      { key: 0, text: 'Tidak ada', value: 0, default: true },
      { key: 1, text: '< 100x/menit', value: 1 },
      { key: 2, text: '> 100x/menit', value: 2 },
    ],
    usahaBernafas: [
      { key: 0, text: 'Tidak ada', value: 0, default: true },
      { key: 1, text: 'Lambat', value: 1 },
      { key: 2, text: 'Menangis kuat', value: 2 },
    ],
    tonusOtot: [
      { key: 0, text: 'Tidak ada gerakan', value: 0, default: true },
      { key: 1, text: 'Extermitas fleksi sedikit', value: 1 },
      { key: 2, text: 'Gerakan aktif', value: 2 },
    ],
    reflek: [
      { key: 0, text: 'Tidak bereaksi', value: 0, default: true },
      { key: 1, text: 'Gerakan sedikit', value: 1 },
      { key: 2, text: 'Reaksi melawan', value: 2 },
    ],
    warnaKulit: [
      { key: 0, text: 'Kebiruan atau pucat', value: 0, default: true },
      {
        key: 1,
        text: 'Tubuh kemerahan dengan tangan/kaki yang kebiruan',
        value: 1,
      },
      { key: 2, text: 'Tubuh kemerahan', value: 2 },
    ],
  },
};

export default ScreeningApgarScoreLabel;
