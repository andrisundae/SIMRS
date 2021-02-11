import React from 'react';

const ScreeningDowneScoreLabel = {
  headerLabel: 'Screening Downe Score',
  descriptionLabel: '',
  formLabel: {
    kelahiran: [
      { index: 0, key: 'tanggal_lahir', label: 'Lahir tanggal' },
      { index: 1, key: 'kelahiran', label: 'Kelahiran' },
      { index: 2, key: 'keadaan', label: 'Keadaan' },
    ],
    pemeriksaan: [
      { index: 0, key: 'waktu_penilaian', label: 'Waktu pemeriksaan' },
      { index: 1, key: 'retraksi', label: 'Retraksi', default: 'retraksi' },
      { index: 2, key: 'merintih', label: 'Merintih', default: 'merintih' },
      {
        index: 3,
        key: 'frekuensi_napas',
        label: 'Frekuensi napas',
        default: 'frekuensiNapas',
      },
      { index: 4, key: 'sianosis', label: 'Sianosis', default: 'sianosis' },
      {
        index: 5,
        key: 'suara_napas',
        label: 'Suara napas',
        default: 'suaraNapas',
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
    retraksi: [
      { key: 0, text: 'Tidak ada retraksi', value: 0, default: true },
      { key: 1, text: 'Retraksi ringan', value: 1 },
      { key: 2, text: 'Retraksi berat', value: 2 },
    ],
    merintih: [
      { key: 0, text: 'Tidak merintih', value: 0, default: true },
      { key: 1, text: 'Dapat didengar dengan stetoskop', value: 1 },
      { key: 2, text: 'Dapat didengar tanpa alat bantu', value: 2 },
    ],
    frekuensiNapas: [
      { key: 0, text: '< 60/menit', value: 0, default: true },
      { key: 1, text: '60-80/menit', value: 1 },
      { key: 2, text: '> 80/menit', value: 2 },
    ],
    sianosis: [
      { key: 0, text: 'Tidak ada sianosis', value: 0, default: true },
      { key: 1, text: 'Sianosis hilang dengan pemberian O2', value: 1 },
      { key: 2, text: 'Sianosis menetap walaupun diberi O2', value: 2 },
    ],
    suaraNapas: [
      {
        key: 0,
        text: 'Suara napas di kedua paru baik',
        value: 0,
        default: true,
      },
      { key: 1, text: 'Suara napas di kedua paru menurun', value: 1 },
      { key: 2, text: 'Tidak ada suara napas di kedua paru', value: 2 },
    ],
  },
};

export default ScreeningDowneScoreLabel;
