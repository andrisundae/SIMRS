import React from 'react';

const DropdownOptions = {
  anemia: [
    { key: 0, text: 'Tidak diperiksa', value: 'Tidak diperiksa' },
    { key: 1, text: '-', value: '-' },
    { key: 2, text: '+', value: '+' },
  ],
  icterus: [
    { key: 0, text: 'Tidak diperiksa', value: 'Tidak diperiksa' },
    { key: 1, text: '-', value: '-' },
    { key: 2, text: '+', value: '+' },
  ],
  cyanosis: [
    { key: 0, text: 'Tidak diperiksa', value: 'Tidak diperiksa' },
    { key: 1, text: '-', value: '-' },
    { key: 2, text: '+', value: '+' },
  ],
  dispneau: [
    { key: 0, text: 'Tidak diperiksa', value: 'Tidak diperiksa' },
    { key: 1, text: '-', value: '-' },
    { key: 2, text: '+', value: '+' },
  ],
  kepala: {
    bayi: {
      kelainan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Caput succedaneum', value: 'Caput succedaneum' },
        { key: 2, text: 'Cephalhematoma', value: 'Cephalhematoma' },
        { key: 3, text: 'Hidrocephalus', value: 'Hidrocephalus' },
        { key: 4, text: 'Microcephalus', value: 'Microcephalus' },
        { key: 5, text: 'An ensephal', value: 'An ensephal' },
      ],
    },
  },
  mulut: {
    bayi: {
      kelainan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Palatoschisis', value: 'Palatoschisis' },
        { key: 2, text: 'Labioschicis', value: 'Labioschicis' },
        { key: 3, text: 'Labiopalato', value: 'Labiopalato' },
      ],
    },
  },
  leher: {
    anastesi: {
      alat_bantu_nafas: [
        {
          key: 0,
          text: (
            <div>
              O<sub>2</sub> Nasal
            </div>
          ),
          value: 'O2 Nasal',
        },
        {
          key: 1,
          text: (
            <div>
              O<sub>2</sub> Masker
            </div>
          ),
          value: 'O2 Masker',
        },
        {
          key: 2,
          text: (
            <div>
              O<sub>2</sub> Masker NR
            </div>
          ),
          value: 'O2 Masker NR',
        },
        {
          key: 3,
          text: (
            <div>
              O<sub>2</sub> JR
            </div>
          ),
          value: 'O2 JR',
        },
        { key: 4, text: 'Ventilator', value: 'Ventilator' },
      ],
      gerak_leher: [
        { key: 0, text: 'Pendek/terbatas', value: 'Pendek/terbatas' },
        { key: 1, text: 'Pendek/bebas', value: 'Pendek/bebas' },
        { key: 2, text: 'Jenjang/terbatas', value: 'Jenjang/terbatas' },
        { key: 3, text: 'Jenjang/bebas', value: 'Jenjang/bebas' },
      ],
      malampathy_score: [
        { key: 0, text: '1', value: '1' },
        { key: 1, text: '2', value: '2' },
        { key: 2, text: '3', value: '3' },
        { key: 3, text: '4', value: '4' },
      ],
    },
  },
  payudara: {
    bersalin: {
      pembesaran: [
        { key: 0, text: 'Normal', value: 'Normal' },
        { key: 1, text: 'Massa mobile', value: 'Massa mobile' },
        { key: 2, text: 'Massa tidak mobile', value: 'Massa tidak mobile' },
      ],
      papilla_mammae: [
        { key: 0, text: 'Inverted', value: 'Inverted' },
        { key: 1, text: 'Datar', value: 'Datar' },
        { key: 2, text: 'Exverted', value: 'Exverted' },
      ],
    },
  },
  jantung: {
    umum: {
      akral: [
        { key: 0, text: 'Hangat', value: 'Hangat' },
        { key: 1, text: 'Dingin', value: 'Dingin' },
        { key: 2, text: 'Panas', value: 'Panas' },
      ],
      warna_kulit: [
        { key: 0, text: 'Normal', value: 'Normal' },
        { key: 1, text: 'Kemerahan', value: 'Kemerahan' },
        { key: 2, text: 'Pucat', value: 'Pucat' },
        { key: 3, text: 'Cyanosis', value: 'Cyanosis' },
      ],
    },
    bersalin: {
      akral: [
        { key: 0, text: 'Hangat', value: 'Hangat' },
        { key: 1, text: 'Dingin', value: 'Dingin' },
        { key: 2, text: 'Panas', value: 'Panas' },
      ],
      warna_kulit: [
        { key: 0, text: 'Normal', value: 'Normal' },
        { key: 1, text: 'Kemerahan', value: 'Kemerahan' },
        { key: 2, text: 'Pucat', value: 'Pucat' },
        { key: 3, text: 'Cyanosis', value: 'Cyanosis' },
      ],
    },
  },
  paru: {
    umum: {
      gangguan_jalan_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Benda asing', value: 'Benda asing' },
        { key: 2, text: 'Darah', value: 'Darah' },
        { key: 3, text: 'Lidah', value: 'Lidah' },
        { key: 4, text: 'Sputum cair', value: 'Sputum cair' },
        { key: 5, text: 'Sputum kental', value: 'Sputum kental' },
      ],
      gangguan_pola_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Apneu', value: 'Apneu' },
        { key: 2, text: 'Bradipneu', value: 'Bradipneu' },
        { key: 3, text: 'Dispneau', value: 'Dispneau' },
        { key: 4, text: 'Takhipneu', value: 'Takhipneu' },
        { key: 5, text: 'Orthopneu', value: 'Orthopneu' },
      ],
      suara_nafas: [
        { key: 0, text: 'Vesicular', value: 'Vesicular' },
        { key: 1, text: 'Bronchovesicular', value: 'Bronchovesicular' },
        { key: 2, text: 'Roles', value: 'Roles' },
        { key: 3, text: 'Ronchi', value: 'Ronchi' },
        { key: 4, text: 'Stridor', value: 'Stridor' },
        { key: 5, text: 'Wheezing', value: 'Wheezing' },
      ],
      alat_bantu: [
        {
          key: 0,
          text: (
            <div>
              O<sub>2</sub> Nasal
            </div>
          ),
          value: 'O2 Nasal',
        },
        {
          key: 1,
          text: (
            <div>
              O<sub>2</sub> Masker
            </div>
          ),
          value: 'O2 Masker',
        },
        {
          key: 2,
          text: (
            <div>
              O<sub>2</sub> Masker NR
            </div>
          ),
          value: 'O2 Masker NR',
        },
        {
          key: 3,
          text: (
            <div>
              O<sub>2</sub> JR
            </div>
          ),
          value: 'O2 JR',
        },
        { key: 4, text: 'Ventilator', value: 'Ventilator' },
      ],
    },
    bersalin: {
      gangguan_jalan_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Benda asing', value: 'Benda asing' },
        { key: 2, text: 'Darah', value: 'Darah' },
        { key: 3, text: 'Lidah', value: 'Lidah' },
        { key: 4, text: 'Sputum cair', value: 'Sputum cair' },
        { key: 5, text: 'Sputum kental', value: 'Sputum kental' },
      ],
      gangguan_pola_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Apneu', value: 'Apneu' },
        { key: 2, text: 'Bradipneu', value: 'Bradipneu' },
        { key: 3, text: 'Dispneau', value: 'Dispneau' },
        { key: 4, text: 'Takhipneu', value: 'Takhipneu' },
        { key: 5, text: 'Orthopneu', value: 'Orthopneu' },
      ],
      suara_nafas: [
        { key: 0, text: 'Vesicular', value: 'Vesicular' },
        { key: 1, text: 'Bronchovesicular', value: 'Bronchovesicular' },
        { key: 2, text: 'Roles', value: 'Roles' },
        { key: 3, text: 'Ronchi', value: 'Ronchi' },
        { key: 4, text: 'Stridor', value: 'Stridor' },
        { key: 5, text: 'Wheezing', value: 'Wheezing' },
      ],
      alat_bantu: [
        {
          key: 0,
          text: (
            <div>
              O<sub>2</sub> Nasal
            </div>
          ),
          value: 'O2 Nasal',
        },
        {
          key: 1,
          text: (
            <div>
              O<sub>2</sub> Masker
            </div>
          ),
          value: 'O2 Masker',
        },
        {
          key: 2,
          text: (
            <div>
              O<sub>2</sub> Masker NR
            </div>
          ),
          value: 'O2 Masker NR',
        },
        {
          key: 3,
          text: (
            <div>
              O<sub>2</sub> JR
            </div>
          ),
          value: 'O2 JR',
        },
        { key: 4, text: 'Ventilator', value: 'Ventilator' },
      ],
    },
    bayi: {
      gangguan_jalan_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Benda asing', value: 'Benda asing' },
        { key: 2, text: 'Darah', value: 'Darah' },
        { key: 3, text: 'Lidah', value: 'Lidah' },
        { key: 4, text: 'Sputum cair', value: 'Sputum cair' },
        { key: 5, text: 'Sputum kental', value: 'Sputum kental' },
      ],
      gangguan_pola_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Apneu', value: 'Apneu' },
        { key: 2, text: 'Bradipneu', value: 'Bradipneu' },
        { key: 3, text: 'Dispneau', value: 'Dispneau' },
        { key: 4, text: 'Takhipneu', value: 'Takhipneu' },
        { key: 5, text: 'Orthopneu', value: 'Orthopneu' },
      ],
      suara_nafas: [
        { key: 0, text: 'Vesicular', value: 'Vesicular' },
        { key: 1, text: 'Bronchovesicular', value: 'Bronchovesicular' },
        { key: 2, text: 'Roles', value: 'Roles' },
        { key: 3, text: 'Ronchi', value: 'Ronchi' },
        { key: 4, text: 'Stridor', value: 'Stridor' },
        { key: 5, text: 'Wheezing', value: 'Wheezing' },
      ],
      alat_bantu: [
        {
          key: 0,
          text: (
            <div>
              O<sub>2</sub> Nasal
            </div>
          ),
          value: 'O2 Nasal',
        },
        {
          key: 1,
          text: (
            <div>
              O<sub>2</sub> Masker
            </div>
          ),
          value: 'O2 Masker',
        },
        {
          key: 2,
          text: (
            <div>
              O<sub>2</sub> Masker NR
            </div>
          ),
          value: 'O2 Masker NR',
        },
        {
          key: 3,
          text: (
            <div>
              O<sub>2</sub> JR
            </div>
          ),
          value: 'O2 JR',
        },
        { key: 4, text: 'Ventilator', value: 'Ventilator' },
      ],
    },
  },
  abdomen: {
    umum: {
      keadaan: [
        { key: 0, text: 'Supel', value: 'Supel' },
        { key: 1, text: 'Ascites', value: 'Ascites' },
        { key: 2, text: 'Buncit', value: 'Buncit' },
        { key: 3, text: 'Defans', value: 'Defans' },
        { key: 4, text: 'Distensi', value: 'Distensi' },
        { key: 5, text: 'Elastis', value: 'Elastis' },
        { key: 6, text: 'Kembung', value: 'Kembung' },
        { key: 7, text: 'Keras', value: 'Keras' },
        { key: 8, text: 'Rata', value: 'Rata' },
      ],
      ngt_lambung: {
        ukuran: [
          { key: 0, text: '8', value: '8' },
          { key: 1, text: '10', value: '10' },
          { key: 2, text: '12', value: '12' },
          { key: 3, text: '14', value: '14' },
          { key: 4, text: '16', value: '16' },
          { key: 5, text: '18', value: '18' },
        ],
        dipasang: [
          { key: 0, text: 'Hidung kanan', value: 'Hidung kanan' },
          { key: 1, text: 'Hidung kiri', value: 'Hidung kiri' },
          { key: 2, text: 'Mulut', value: 'Mulut' },
        ],
      },
      drain_abdomen: {
        ukuran: [
          { key: 0, text: '8', value: '8' },
          { key: 1, text: '10', value: '10' },
          { key: 2, text: '12', value: '12' },
          { key: 3, text: '14', value: '14' },
          { key: 4, text: '16', value: '16' },
          { key: 5, text: '18', value: '18' },
        ],
      },
    },
    bersalin: {
      obstetri: {
        linea: [
          { key: 0, text: 'Alba', value: 'Alba' },
          { key: 1, text: 'Albicans', value: 'Albicans' },
          { key: 2, text: 'Livide', value: 'Livide' },
          { key: 3, text: 'Nigra', value: 'Nigra' },
          { key: 4, text: 'Striae', value: 'Striae' },
        ],
        leopold_I: [
          {
            key: 0,
            text: '3 jari di atas simpysis',
            value: '3 jari di atas simpysis',
          },
          {
            key: 1,
            text: '3 jari di atas pusat',
            value: '3 jari di atas pusat',
          },
          { key: 2, text: '2 jari di bawah PX', value: '2 jari di bawah PX' },
          { key: 3, text: '3 jari di bawah PX', value: '3 jari di bawah PX' },
          { key: 4, text: '4 jari di bawah PX', value: '4 jari di bawah PX' },
          {
            key: 5,
            text: 'Pertengahan pusat & PX',
            value: 'Pertengahan pusat & PX',
          },
          {
            key: 6,
            text: 'Pertengahan simpysis & pusat',
            value: 'Pertengahan simpysis & pusat',
          },
          { key: 7, text: 'Setinggi pusat', value: 'Setinggi pusat' },
        ],
        leopold_III: [
          { key: 0, text: 'Ballottement', value: 'Ballottement' },
          { key: 1, text: 'Bokong', value: 'Bokong' },
          { key: 2, text: 'Kepala', value: 'Kepala' },
        ],
        leopold_IV: [
          { key: 0, text: 'Divergen', value: 'Divergen' },
          { key: 1, text: 'Konvergen', value: 'Konvergen' },
          { key: 2, text: 'Sejajar', value: 'Sejajar' },
        ],
      },
    },
    bayi: {
      keadaan: [
        { key: 0, text: 'Supel', value: 'Supel' },
        { key: 1, text: 'Ascites', value: 'Ascites' },
        { key: 2, text: 'Buncit', value: 'Buncit' },
        { key: 3, text: 'Defans', value: 'Defans' },
        { key: 4, text: 'Distensi', value: 'Distensi' },
        { key: 5, text: 'Elastis', value: 'Elastis' },
        { key: 6, text: 'Kembung', value: 'Kembung' },
        { key: 7, text: 'Keras', value: 'Keras' },
        { key: 8, text: 'Rata', value: 'Rata' },
      ],
      kelainan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Gastroschisis', value: 'Gastroschisis' },
        { key: 2, text: 'Omfalokel', value: 'Omfalokel' },
      ],
    },
  },
  kulit: {
    umum: {
      penyebab_luka: [
        { key: 0, text: 'AV shunt', value: 'AV shunt' },
        { key: 1, text: 'CAPD', value: 'CAPD' },
        { key: 2, text: 'Double lumen', value: 'Double lumen' },
        { key: 3, text: 'Luka pasca operasi', value: 'Luka pasca operasi' },
        { key: 4, text: 'Luka pasca WSD', value: 'Luka pasca WSD' },
        { key: 5, text: 'Ulkus decubitus', value: 'Ulkus decubitus' },
        { key: 6, text: 'Ulkus diabeticum', value: 'Ulkus diabeticum' },
      ],
      tanda_peradangan: [
        { key: 0, text: 'Kemerahan', value: 'Kemerahan' },
        { key: 1, text: 'Panas', value: 'Panas' },
        { key: 2, text: 'Bengkak', value: 'Bengkak' },
        { key: 3, text: 'Nyeri', value: 'Nyeri' },
        { key: 4, text: 'Fungsioleisa', value: 'Fungsioleisa' },
      ],
    },
    bersalin: {
      penyebab_luka: [
        { key: 0, text: 'AV shunt', value: 'AV shunt' },
        { key: 1, text: 'CAPD', value: 'CAPD' },
        { key: 2, text: 'Double lumen', value: 'Double lumen' },
        { key: 3, text: 'Luka pasca operasi', value: 'Luka pasca operasi' },
        { key: 4, text: 'Luka pasca WSD', value: 'Luka pasca WSD' },
        { key: 5, text: 'Ulkus decubitus', value: 'Ulkus decubitus' },
        { key: 6, text: 'Ulkus diabeticum', value: 'Ulkus diabeticum' },
      ],
      tanda_peradangan: [
        { key: 0, text: 'Kemerahan', value: 'Kemerahan' },
        { key: 1, text: 'Panas', value: 'Panas' },
        { key: 2, text: 'Bengkak', value: 'Bengkak' },
        { key: 3, text: 'Nyeri', value: 'Nyeri' },
        { key: 4, text: 'Fungsioleisa', value: 'Fungsioleisa' },
      ],
    },
    anastesi: {
      penyebab_luka: [
        { key: 0, text: 'AV shunt', value: 'AV shunt' },
        { key: 1, text: 'CAPD', value: 'CAPD' },
        { key: 2, text: 'Double lumen', value: 'Double lumen' },
        { key: 3, text: 'Luka pasca operasi', value: 'Luka pasca operasi' },
        { key: 4, text: 'Luka pasca WSD', value: 'Luka pasca WSD' },
        { key: 5, text: 'Ulkus decubitus', value: 'Ulkus decubitus' },
        { key: 6, text: 'Ulkus diabeticum', value: 'Ulkus diabeticum' },
      ],
      tanda_peradangan: [
        { key: 0, text: 'Kemerahan', value: 'Kemerahan' },
        { key: 1, text: 'Panas', value: 'Panas' },
        { key: 2, text: 'Bengkak', value: 'Bengkak' },
        { key: 3, text: 'Nyeri', value: 'Nyeri' },
        { key: 4, text: 'Fungsioleisa', value: 'Fungsioleisa' },
      ],
    },
    bayi: {
      penyebab_luka: [
        { key: 0, text: 'AV shunt', value: 'AV shunt' },
        { key: 1, text: 'CAPD', value: 'CAPD' },
        { key: 2, text: 'Double lumen', value: 'Double lumen' },
        { key: 3, text: 'Luka pasca operasi', value: 'Luka pasca operasi' },
        { key: 4, text: 'Luka pasca WSD', value: 'Luka pasca WSD' },
        { key: 5, text: 'Ulkus decubitus', value: 'Ulkus decubitus' },
        { key: 6, text: 'Ulkus diabeticum', value: 'Ulkus diabeticum' },
      ],
      tanda_peradangan: [
        { key: 0, text: 'Kemerahan', value: 'Kemerahan' },
        { key: 1, text: 'Panas', value: 'Panas' },
        { key: 2, text: 'Bengkak', value: 'Bengkak' },
        { key: 3, text: 'Nyeri', value: 'Nyeri' },
        { key: 4, text: 'Fungsioleisa', value: 'Fungsioleisa' },
      ],
    },
  },
  genetalia: {
    umum: {
      catheter: {
        ukuran: [
          { key: 0, text: '8', value: '8' },
          { key: 1, text: '10', value: '10' },
          { key: 2, text: '12', value: '12' },
          { key: 3, text: '14', value: '14' },
          { key: 4, text: '16', value: '16' },
          { key: 5, text: '18', value: '18' },
        ],
      },
    },
    bersalin: {
      penurunan_bagian_terendah: [
        { key: 0, text: 'Hodge I', value: 'Hodge I' },
        { key: 1, text: 'Hodge II', value: 'Hodge II' },
        { key: 2, text: 'Hodge III', value: 'Hodge III' },
        { key: 3, text: 'Hodge IV', value: 'Hodge IV' },
      ],
    },
  },
  extermitas: {
    umum: {
      motorik: {
        tangan_kanan: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        tangan_kiri: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        kaki_kanan: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        kaki_kiri: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
      },
      sensorik: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Hyper estesia', value: 'Hyper estesia' },
        { key: 2, text: 'Parestesia', value: 'Parestesia' },
        { key: 3, text: 'Anestesia', value: 'Anestesia' },
      ],
    },
    bersalin: {
      motorik: {
        tangan_kanan: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        tangan_kiri: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        kaki_kanan: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        kaki_kiri: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
      },
      sensorik: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Hyper estesia', value: 'Hyper estesia' },
        { key: 2, text: 'Parestesia', value: 'Parestesia' },
        { key: 3, text: 'Anestesia', value: 'Anestesia' },
      ],
    },
    anastesi: {
      motorik: {
        tangan_kanan: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        tangan_kiri: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        kaki_kanan: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
        kaki_kiri: [
          {
            key: 0,
            text: '5 (Kekuatan kontraksi yang penuh)',
            value: '5 (Kekuatan kontraksi yang penuh)',
          },
          {
            key: 1,
            text: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
            value: '4 (Cukup kuat tetapi bukan kekuatan penuh)',
          },
          {
            key: 2,
            text: '3 (Cukup kuat untuk mengatasi gravitasi)',
            value: '3 (Cukup kuat untuk mengatasi gravitasi)',
          },
          {
            key: 3,
            text:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
            value:
              '2 (Kemampuan untuk bergerak, tetapi tidak kuat melawan tahanan / gravitasi)',
          },
          {
            key: 4,
            text: '1 (Gerakan kontraksi yang sangat lemah)',
            value: '1 (Gerakan kontraksi yang sangat lemah)',
          },
          {
            key: 5,
            text: '0 (Tidak ada kontaksi sama sekali)',
            value: '0 (Tidak ada kontaksi sama sekali)',
          },
        ],
      },
      sensorik: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Hyper estesia', value: 'Hyper estesia' },
        { key: 2, text: 'Parestesia', value: 'Parestesia' },
        { key: 3, text: 'Anestesia', value: 'Anestesia' },
      ],
    },
    bayi: {
      kelainan_jari_tangan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Polidaktili', value: 'Polidaktili' },
        { key: 2, text: 'Sindaktili', value: 'Sindaktili' },
      ],
      kelainan_jari_kaki: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'CTEV', value: 'CTEV' },
        { key: 2, text: 'Polidaktili', value: 'Polidaktili' },
        { key: 3, text: 'Sindaktili', value: 'Sindaktili' },
      ],
    },
  },
};

export default DropdownOptions;
