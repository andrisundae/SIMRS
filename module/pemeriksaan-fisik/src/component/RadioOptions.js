import React from 'react';

const RadioOptions = {
  mata: {
    umum: {
      pupil: [
        { key: 0, text: 'Isokor', value: 'Isokor' },
        { key: 1, text: 'Anisokor', value: 'Anisokor' },
      ],
    },
    bersalin: {
      pupil: [
        { key: 0, text: 'Isokor', value: 'Isokor' },
        { key: 1, text: 'Anisokor', value: 'Anisokor' },
      ],
    },
    anastesi: {
      pupil: [
        { key: 0, text: 'Isokor', value: 'Isokor' },
        { key: 1, text: 'Anisokor', value: 'Anisokor' },
      ],
    },
    bayi: {
      pupil: [
        { key: 0, text: 'Isokor', value: 'Isokor' },
        { key: 1, text: 'Anisokor', value: 'Anisokor' },
      ],
    },
  },
  leher: {
    anastesi: {
      jalan_nafas: [
        { key: 0, text: 'Paten', value: 'Paten' },
        { key: 1, text: 'Sumbatan', value: 'Sumbatan' },
      ],
      proteusi_mandibula: [
        { key: 0, text: 'Ada', value: 'Ada' },
        { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
      ],
      buka_mulut: [
        { key: 0, text: '< 3 jari', value: '< 3 jari' },
        { key: 1, text: '> 3 jari', value: '> 3 jari' },
      ],
      jarak_mentohyoid: [
        { key: 0, text: '< 6 cm', value: '< 6 cm' },
        { key: 1, text: '> 6 cm', value: '> 6 cm' },
      ],
      jarak_hyothyroid: [
        { key: 0, text: '< 8 cm', value: '< 8 cm' },
        { key: 1, text: '> 8 cm', value: '> 8 cm' },
      ],
      massa: [
        { key: 0, text: 'Ada', value: 'Ada' },
        { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
      ],
      ventilasi: [
        { key: 0, text: 'Mudah', value: 'Mudah' },
        { key: 1, text: 'Sulit', value: 'Sulit' },
      ],
      intubasi: [
        { key: 0, text: 'Mudah', value: 'Mudah' },
        { key: 1, text: 'Sulit', value: 'Sulit' },
      ],
    },
  },
  payudara: {
    bersalin: {
      kolostrum: [
        { key: 0, text: 'Ya', value: 'Ya' },
        { key: 1, text: 'Tidak', value: 'Tidak' },
      ],
    },
  },
  jantung: {
    umum: {
      crt: [
        { key: 0, text: '< 3 detik', value: '< 3 detik' },
        { key: 1, text: '> 3 detik', value: '> 3 detik' },
      ],
    },
    bersalin: {
      crt: [
        { key: 0, text: '< 3 detik', value: '< 3 detik' },
        { key: 1, text: '> 3 detik', value: '> 3 detik' },
      ],
    },
    bayi: {
      gangguan: [
        { key: 0, text: 'Murmur', value: 'Murmur' },
        { key: 1, text: 'Gallop', value: 'Gallop' },
      ],
    },
  },
  paru: {
    umum: {
      jenis_nafas: [
        { key: 0, text: 'Pernafasan dada', value: 'Pernafasan dada' },
        { key: 1, text: 'Pernafasan perut', value: 'Pernafasan perut' },
      ],
      wsd1: {
        lokasi: [
          { key: 0, text: 'Dada kanan', value: 'Dada kanan' },
          { key: 1, text: 'Dada kiri', value: 'Dada kiri' },
        ],
        undulasi: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        rembesan: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        emphysema: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
      },
      wsd2: {
        lokasi: [
          { key: 0, text: 'Dada kanan', value: 'Dada kanan' },
          { key: 1, text: 'Dada kiri', value: 'Dada kiri' },
        ],
        undulasi: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        rembesan: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        emphysema: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
      },
      cvc: {
        lokasi: [
          { key: 0, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 1, text: 'Subelavia kiri', value: 'Subelavia kiri' },
        ],
        keadaan_lumens: [
          { key: 0, text: 'Paten', value: 'Paten' },
          { key: 1, text: 'Heparin', value: 'Heparin' },
        ],
      },
    },
    bersalin: {
      jenis_nafas: [
        { key: 0, text: 'Pernafasan dada', value: 'Pernafasan dada' },
        { key: 1, text: 'Pernafasan perut', value: 'Pernafasan perut' },
      ],
      wsd1: {
        lokasi: [
          { key: 0, text: 'Dada kanan', value: 'Dada kanan' },
          { key: 1, text: 'Dada kiri', value: 'Dada kiri' },
        ],
        undulasi: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        rembesan: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        emphysema: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
      },
      wsd2: {
        lokasi: [
          { key: 0, text: 'Dada kanan', value: 'Dada kanan' },
          { key: 1, text: 'Dada kiri', value: 'Dada kiri' },
        ],
        undulasi: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        rembesan: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        emphysema: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
      },
      cvc: {
        lokasi: [
          { key: 0, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 1, text: 'Subelavia kiri', value: 'Subelavia kiri' },
        ],
        keadaan_lumens: [
          { key: 0, text: 'Paten', value: 'Paten' },
          { key: 1, text: 'Heparin', value: 'Heparin' },
        ],
      },
    },
    bayi: {
      jenis_nafas: [
        { key: 0, text: 'Pernafasan dada', value: 'Pernafasan dada' },
        { key: 1, text: 'Pernafasan perut', value: 'Pernafasan perut' },
      ],
      wsd1: {
        lokasi: [
          { key: 0, text: 'Dada kanan', value: 'Dada kanan' },
          { key: 1, text: 'Dada kiri', value: 'Dada kiri' },
        ],
        undulasi: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        rembesan: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        emphysema: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
      },
      wsd2: {
        lokasi: [
          { key: 0, text: 'Dada kanan', value: 'Dada kanan' },
          { key: 1, text: 'Dada kiri', value: 'Dada kiri' },
        ],
        undulasi: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        rembesan: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        emphysema: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
      },
      cvc: {
        lokasi: [
          { key: 0, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 1, text: 'Subelavia kiri', value: 'Subelavia kiri' },
        ],
        keadaan_lumens: [
          { key: 0, text: 'Paten', value: 'Paten' },
          { key: 1, text: 'Heparin', value: 'Heparin' },
        ],
      },
    },
  },
  abdomen: {
    umum: {
      bising_usus: [
        { key: 0, text: 'dbn', value: 'dbn' },
        { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 2, text: 'Meningkat', value: 'Meningkat' },
        { key: 3, text: 'Menurun', value: 'Menurun' },
      ],
      massa: {
        konsistensi: [
          { key: 0, text: 'Keras', value: 'Keras' },
          { key: 1, text: 'Lunak', value: 'Lunak' },
        ],
      },
      drain_abdomen: {
        lokasi: [
          { key: 0, text: 'Perut kanan', value: 'Perut kanan' },
          { key: 1, text: 'Perut kiri', value: 'Perut kiri' },
        ],
      },
    },
    bersalin: {
      obstetri: {
        pembesaran: [
          { key: 0, text: 'Melintang', value: 'Melintang' },
          { key: 1, text: 'Membujur', value: 'Membujur' },
        ],
        luka_bekas_operasi: [
          { key: 0, text: 'Ada', value: 'Ada' },
          { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
        ],
        teraba: [
          { key: 0, text: 'Bokong', value: 'Bokong' },
          { key: 1, text: 'Kepala', value: 'Kepala' },
        ],
        leopold_II: [
          {
            key: 0,
            text: 'Teraba punggung kanan',
            value: 'Teraba punggung kanan',
          },
          {
            key: 1,
            text: 'Teraba punggung kiri',
            value: 'Teraba punggung kiri',
          },
        ],
      },
    },
    bayi: {
      bising_usus: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Meningkat', value: 'Meningkat' },
        { key: 2, text: 'Menurun', value: 'Menurun' },
      ],
    },
  },
  kulit: {
    umum: {
      jenis_luka: [
        { key: 0, text: 'Bersih', value: 'Bersih' },
        { key: 1, text: 'Kotor', value: 'Kotor' },
      ],
    },
    bersalin: {
      jenis_luka: [
        { key: 0, text: 'Bersih', value: 'Bersih' },
        { key: 1, text: 'Kotor', value: 'Kotor' },
      ],
    },
    anastesi: {
      jenis_luka: [
        { key: 0, text: 'Bersih', value: 'Bersih' },
        { key: 1, text: 'Kotor', value: 'Kotor' },
      ],
    },
    bayi: {
      jenis_luka: [
        { key: 0, text: 'Bersih', value: 'Bersih' },
        { key: 1, text: 'Kotor', value: 'Kotor' },
      ],
    },
  },
  sistem_saraf: {
    umum: {
      sensorik: [
        { key: 0, text: 'Terganggu', value: 'Terganggu' },
        { key: 1, text: 'Tidak terganggu', value: 'Tidak terganggu' },
      ],
      motorik: [
        { key: 0, text: 'Terganggu', value: 'Terganggu' },
        { key: 1, text: 'Tidak terganggu', value: 'Tidak terganggu' },
      ],
    },
    bersalin: {
      sensorik: [
        { key: 0, text: 'Terganggu', value: 'Terganggu' },
        { key: 1, text: 'Tidak terganggu', value: 'Tidak terganggu' },
      ],
      motorik: [
        { key: 0, text: 'Terganggu', value: 'Terganggu' },
        { key: 1, text: 'Tidak terganggu', value: 'Tidak terganggu' },
      ],
    },
    bayi: {
      sensorik: [
        { key: 0, text: 'Terganggu', value: 'Terganggu' },
        { key: 1, text: 'Tidak terganggu', value: 'Tidak terganggu' },
      ],
      motorik: [
        { key: 0, text: 'Terganggu', value: 'Terganggu' },
        { key: 1, text: 'Tidak terganggu', value: 'Tidak terganggu' },
      ],
    },
  },
  genetalia: {
    bersalin: {
      varises_vagina: [
        { key: 0, text: 'Ada', value: 'Ada' },
        { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
      ],
      portio: [
        { key: 0, text: 'Kaku', value: 'Kaku' },
        { key: 1, text: 'Lunak', value: 'Lunak' },
      ],
      arah_portio: [
        { key: 0, text: 'Antefleksi', value: 'Antefleksi' },
        { key: 1, text: 'Retrofleksi', value: 'Retrofleksi' },
      ],
      ketuban: [
        { key: 0, text: 'Belum pecah', value: 'Belum pecah' },
        { key: 1, text: 'Pecah', value: 'Pecah' },
      ],
    },
    bayi: {
      anus: [
        { key: 0, text: 'Ada', value: 'Ada' },
        { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
      ],
      mekonium: [
        { key: 0, text: 'Ada', value: 'Ada' },
        { key: 1, text: 'Tidak ada', value: 'Tidak ada' },
      ],
    },
  },
};

export default RadioOptions;
