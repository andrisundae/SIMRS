import React from 'react';

const CheckboxOptions = {
  leher: {
    anastesi: {
      gigi_geligi: [
        { key: 0, text: 'Lengkap atas & bawah', value: 'Lengkap atas & bawah' },
        { key: 1, text: 'Lengkap atas', value: 'Lengkap atas' },
        { key: 2, text: 'Lengkap bawah', value: 'Lengkap bawah' },
        { key: 3, text: 'Sebagian ompong atas', value: 'Sebagian ompong atas' },
        {
          key: 4,
          text: 'Sebagian ompong bawah',
          value: 'Sebagian ompong bawah',
        },
        { key: 5, text: 'Ompong total', value: 'Ompong total' },
        { key: 6, text: 'Tonggos', value: 'Tonggos' },
      ],
    },
  },
  jantung: {
    umum: {
      edema: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Pada muka', value: 'Pada muka' },
        { key: 2, text: 'Pada tungkai atas', value: 'Pada tungkai atas' },
        { key: 3, text: 'Pada tungkai bawah', value: 'Pada tungkai bawah' },
        { key: 4, text: 'Pada seluruh tubuh', value: 'Pada seluruh tubuh' },
      ],
    },
    bersalin: {
      edema: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Pada muka', value: 'Pada muka' },
        { key: 2, text: 'Pada tungkai atas', value: 'Pada tungkai atas' },
        { key: 3, text: 'Pada tungkai bawah', value: 'Pada tungkai bawah' },
        { key: 4, text: 'Pada seluruh tubuh', value: 'Pada seluruh tubuh' },
      ],
    },
    anastesi: {
      cardiovascular: [
        { key: 0, text: 'Angina', value: 'Angina' },
        { key: 1, text: 'PJK', value: 'PJK' },
        { key: 2, text: 'CAD', value: 'CAD' },
        { key: 3, text: 'CHF', value: 'CHF' },
        { key: 4, text: 'Aritmia', value: 'Aritmia' },
        { key: 5, text: 'Demam rheuma', value: 'Demam rheuma' },
        { key: 6, text: 'Heart murmur', value: 'Heart murmur' },
        { key: 7, text: 'Hipertensi', value: 'Hipertensi' },
        { key: 8, text: 'MCI', value: 'MCI' },
        { key: 9, text: 'Pacemaker', value: 'Pacemaker' },
        { key: 10, text: 'Penyakit katub', value: 'Penyakit katub' },
      ],
    },
  },
  paru: {
    umum: {
      otot_bantu_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Cuping hidung', value: 'Cuping hidung' },
        { key: 2, text: 'Retraksi dada', value: 'Retraksi dada' },
      ],
      cvc: {
        keadaan: [
          { key: 0, text: 'Baik', value: 'Baik' },
          { key: 1, text: 'Bengkak', value: 'Bengkak' },
          { key: 2, text: 'Bersih', value: 'Bersih' },
          { key: 3, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 4, text: 'Kotor', value: 'Kotor' },
          { key: 5, text: 'Nyeri', value: 'Nyeri' },
        ],
        balutan: [
          { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
          { key: 1, text: 'Debri demerit', value: 'Debri demerit' },
          { key: 2, text: 'Irigasi', value: 'Irigasi' },
          { key: 3, text: 'Fraktune', value: 'Fraktune' },
        ],
      },
    },
    bersalin: {
      otot_bantu_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Cuping hidung', value: 'Cuping hidung' },
        { key: 2, text: 'Retraksi dada', value: 'Retraksi dada' },
      ],
      cvc: {
        keadaan: [
          { key: 0, text: 'Baik', value: 'Baik' },
          { key: 1, text: 'Bengkak', value: 'Bengkak' },
          { key: 2, text: 'Bersih', value: 'Bersih' },
          { key: 3, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 4, text: 'Kotor', value: 'Kotor' },
          { key: 5, text: 'Nyeri', value: 'Nyeri' },
        ],
        balutan: [
          { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
          { key: 1, text: 'Debri demerit', value: 'Debri demerit' },
          { key: 2, text: 'Irigasi', value: 'Irigasi' },
          { key: 3, text: 'Fraktune', value: 'Fraktune' },
        ],
      },
    },
    anastesi: {
      respiratory: [
        { key: 0, text: 'Asthma', value: 'Asthma' },
        { key: 1, text: 'Kronclutis', value: 'Kronclutis' },
        { key: 2, text: 'Effusi pleura', value: 'Effusi pleura' },
        { key: 3, text: 'ISPA', value: 'ISPA' },
        { key: 4, text: 'PPOK', value: 'PPOK' },
        { key: 5, text: 'Pneumoni', value: 'Pneumoni' },
        { key: 6, text: 'TB', value: 'TB' },
        { key: 7, text: 'Dispneau', value: 'Dispneau' },
        { key: 8, text: 'Orthopneu', value: 'Orthopneu' },
        { key: 9, text: 'Sleep apneau', value: 'Sleep apneau' },
      ],
    },
    bayi: {
      otot_bantu_nafas: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Cuping hidung', value: 'Cuping hidung' },
        { key: 2, text: 'Retraksi dada', value: 'Retraksi dada' },
      ],
      cvc: {
        keadaan: [
          { key: 0, text: 'Baik', value: 'Baik' },
          { key: 1, text: 'Bengkak', value: 'Bengkak' },
          { key: 2, text: 'Bersih', value: 'Bersih' },
          { key: 3, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 4, text: 'Kotor', value: 'Kotor' },
          { key: 5, text: 'Nyeri', value: 'Nyeri' },
        ],
        balutan: [
          { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
          { key: 1, text: 'Debri demerit', value: 'Debri demerit' },
          { key: 2, text: 'Irigasi', value: 'Irigasi' },
          { key: 3, text: 'Fraktune', value: 'Fraktune' },
        ],
      },
    },
  },
  abdomen: {
    umum: {
      perkusi: [
        { key: 0, text: 'Tympani', value: 'Tympani' },
        { key: 1, text: 'Meteorismus', value: 'Meteorismus' },
        { key: 2, text: 'Pekak', value: 'Pekak' },
        { key: 3, text: 'Redup', value: 'Redup' },
      ],
      ngt_lambung: {
        fungsi: [
          { key: 0, text: 'Pemberian makan', value: 'Pemberian makan' },
          { key: 1, text: 'Kumbah lambung', value: 'Kumbah lambung' },
        ],
      },
      drain_abdomen: {
        cairan: [
          { key: 0, text: 'Darah', value: 'Darah' },
          { key: 1, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 2, text: 'Lendir', value: 'Lendir' },
          { key: 3, text: 'Nanah/Pus', value: 'Nanah/Pus' },
          { key: 4, text: 'Serum', value: 'Serum' },
        ],
      },
    },
    anastesi: {
      hepato: [
        { key: 0, text: 'Drug alkohol abuse', value: 'Drug alkohol abuse' },
        { key: 1, text: 'Hepatitis/icterus', value: 'Hepatitis/icterus' },
        { key: 2, text: 'Hiatal hemia/reflux', value: 'Hiatal hemia/reflux' },
        { key: 3, text: 'Mual', value: 'Mual' },
        { key: 4, text: 'Muntah', value: 'Muntah' },
        { key: 5, text: 'Obstruksi usus', value: 'Obstruksi usus' },
        { key: 6, text: 'Penyakit liver', value: 'Penyakit liver' },
        { key: 7, text: 'Sirosis', value: 'Sirosis' },
        { key: 8, text: 'Tukak peptik/ulkus', value: 'Tukak peptik/ulkus' },
        { key: 9, text: 'Colelithiasis', value: 'Colelithiasis' },
      ],
      lainnya: [
        { key: 0, text: 'Anemia', value: 'Anemia' },
        { key: 1, text: 'Anticoagular', value: 'Anticoagular' },
        {
          key: 2,
          text: 'Bleeding tendencies/disorder',
          value: 'Bleeding tendencies/disorder',
        },
        { key: 3, text: 'Hemophilia', value: 'Hemophilia' },
        {
          key: 4,
          text: "Sickle's cell disease/trait",
          value: "Sickle's cell disease/trait",
        },
        { key: 5, text: 'Immuno supresan', value: 'Immuno supresan' },
        { key: 6, text: 'Cancer', value: 'Cancer' },
        { key: 7, text: 'Kehamilan', value: 'Kehamilan' },
        { key: 8, text: 'Obesity', value: 'Obesity' },
      ],
    },
  },
  kulit: {
    umum: {
      luka: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        {
          key: 1,
          text: 'Luka di ekstermitas atas kanan',
          value: 'Luka di ekstermitas atas kanan',
        },
        {
          key: 2,
          text: 'Luka di ekstermitas atas kiri',
          value: 'Luka di ekstermitas atas kiri',
        },
        {
          key: 3,
          text: 'Luka di ekstermitas bawah kanan',
          value: 'Luka di ekstermitas bawah kanan',
        },
        {
          key: 4,
          text: 'Luka di ekstermitas bawah kiri',
          value: 'Luka di ekstermitas bawah kiri',
        },
        { key: 5, text: 'Luka di siku kanan', value: 'Luka di siku kanan' },
        { key: 6, text: 'Luka di siku kiri', value: 'Luka di siku kiri' },
        { key: 7, text: 'Luka di tumit kanan', value: 'Luka di tumit kanan' },
        { key: 8, text: 'Luka di tumit kiri', value: 'Luka di tumit kiri' },
        { key: 9, text: 'Sacrum', value: 'Sacrum' },
        {
          key: 10,
          text: 'Luka di seluruh tubuh',
          value: 'Luka di seluruh tubuh',
        },
      ],
    },
    bersalin: {
      luka: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        {
          key: 1,
          text: 'Luka di ekstermitas atas kanan',
          value: 'Luka di ekstermitas atas kanan',
        },
        {
          key: 2,
          text: 'Luka di ekstermitas atas kiri',
          value: 'Luka di ekstermitas atas kiri',
        },
        {
          key: 3,
          text: 'Luka di ekstermitas bawah kanan',
          value: 'Luka di ekstermitas bawah kanan',
        },
        {
          key: 4,
          text: 'Luka di ekstermitas bawah kiri',
          value: 'Luka di ekstermitas bawah kiri',
        },
        { key: 5, text: 'Luka di siku kanan', value: 'Luka di siku kanan' },
        { key: 6, text: 'Luka di siku kiri', value: 'Luka di siku kiri' },
        { key: 7, text: 'Luka di tumit kanan', value: 'Luka di tumit kanan' },
        { key: 8, text: 'Luka di tumit kiri', value: 'Luka di tumit kiri' },
        { key: 9, text: 'Sacrum', value: 'Sacrum' },
        {
          key: 10,
          text: 'Luka di seluruh tubuh',
          value: 'Luka di seluruh tubuh',
        },
      ],
    },
    anastesi: {
      luka: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        {
          key: 1,
          text: 'Luka di ekstermitas atas kanan',
          value: 'Luka di ekstermitas atas kanan',
        },
        {
          key: 2,
          text: 'Luka di ekstermitas atas kiri',
          value: 'Luka di ekstermitas atas kiri',
        },
        {
          key: 3,
          text: 'Luka di ekstermitas bawah kanan',
          value: 'Luka di ekstermitas bawah kanan',
        },
        {
          key: 4,
          text: 'Luka di ekstermitas bawah kiri',
          value: 'Luka di ekstermitas bawah kiri',
        },
        { key: 5, text: 'Luka di siku kanan', value: 'Luka di siku kanan' },
        { key: 6, text: 'Luka di siku kiri', value: 'Luka di siku kiri' },
        { key: 7, text: 'Luka di tumit kanan', value: 'Luka di tumit kanan' },
        { key: 8, text: 'Luka di tumit kiri', value: 'Luka di tumit kiri' },
        { key: 9, text: 'Sacrum', value: 'Sacrum' },
        {
          key: 10,
          text: 'Luka di seluruh tubuh',
          value: 'Luka di seluruh tubuh',
        },
      ],
    },
    bayi: {
      luka: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        {
          key: 1,
          text: 'Luka di ekstermitas atas kanan',
          value: 'Luka di ekstermitas atas kanan',
        },
        {
          key: 2,
          text: 'Luka di ekstermitas atas kiri',
          value: 'Luka di ekstermitas atas kiri',
        },
        {
          key: 3,
          text: 'Luka di ekstermitas bawah kanan',
          value: 'Luka di ekstermitas bawah kanan',
        },
        {
          key: 4,
          text: 'Luka di ekstermitas bawah kiri',
          value: 'Luka di ekstermitas bawah kiri',
        },
        { key: 5, text: 'Luka di siku kanan', value: 'Luka di siku kanan' },
        { key: 6, text: 'Luka di siku kiri', value: 'Luka di siku kiri' },
        { key: 7, text: 'Luka di tumit kanan', value: 'Luka di tumit kanan' },
        { key: 8, text: 'Luka di tumit kiri', value: 'Luka di tumit kiri' },
        { key: 9, text: 'Sacrum', value: 'Sacrum' },
        {
          key: 10,
          text: 'Luka di seluruh tubuh',
          value: 'Luka di seluruh tubuh',
        },
      ],
    },
  },
  tulang_belakang: {
    umum: {
      kelainan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Kifosis', value: 'Kifosis' },
        { key: 2, text: 'Lordosis', value: 'Lordosis' },
        { key: 3, text: 'Meningokel', value: 'Meningokel' },
        { key: 4, text: 'Skoliosis', value: 'Skoliosis' },
        { key: 5, text: 'Spina bifida', value: 'Spina bifida' },
        { key: 6, text: 'Gibus', value: 'Gibus' },
        { key: 7, text: 'Fraktur', value: 'Fraktur' },
      ],
    },
    bersalin: {
      kelainan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Kifosis', value: 'Kifosis' },
        { key: 2, text: 'Lordosis', value: 'Lordosis' },
        { key: 3, text: 'Meningokel', value: 'Meningokel' },
        { key: 4, text: 'Skoliosis', value: 'Skoliosis' },
        { key: 5, text: 'Spina bifida', value: 'Spina bifida' },
        { key: 6, text: 'Gibus', value: 'Gibus' },
        { key: 7, text: 'Fraktur', value: 'Fraktur' },
      ],
    },
    anastesi: {
      kelainan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Kifosis', value: 'Kifosis' },
        { key: 2, text: 'Lordosis', value: 'Lordosis' },
        { key: 3, text: 'Meningokel', value: 'Meningokel' },
        { key: 4, text: 'Skoliosis', value: 'Skoliosis' },
        { key: 5, text: 'Spina bifida', value: 'Spina bifida' },
        { key: 6, text: 'Gibus', value: 'Gibus' },
        { key: 7, text: 'Fraktur', value: 'Fraktur' },
      ],
    },
    bayi: {
      kelainan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Kifosis', value: 'Kifosis' },
        { key: 2, text: 'Lordosis', value: 'Lordosis' },
        { key: 3, text: 'Meningokel', value: 'Meningokel' },
        { key: 4, text: 'Skoliosis', value: 'Skoliosis' },
        { key: 5, text: 'Spina bifida', value: 'Spina bifida' },
        { key: 6, text: 'Gibus', value: 'Gibus' },
        { key: 7, text: 'Fraktur', value: 'Fraktur' },
      ],
    },
  },
  sistem_saraf: {
    anastesi: {
      neuroskeletal: [
        { key: 0, text: 'Arthritis', value: 'Arthritis' },
        { key: 1, text: 'TVA', value: 'TVA' },
        { key: 2, text: 'CVA', value: 'CVA' },
        { key: 3, text: 'Kejang', value: 'Kejang' },
        { key: 4, text: 'Parese', value: 'Parese' },
        { key: 5, text: 'Plegi', value: 'Plegi' },
      ],
    },
  },
  genetalia: {
    umum: {
      cairan_urethra: [
        { key: 0, text: 'Darah menstruasi', value: 'Darah menstruasi' },
        { key: 1, text: 'Jernih', value: 'Jernih' },
        { key: 2, text: 'Keruh', value: 'Keruh' },
        { key: 3, text: 'Terdapat darah', value: 'Terdapat darah' },
      ],
    },
    bersalin: {
      vagina_vulva: [
        { key: 0, text: 'Bersih', value: 'Bersih' },
        { key: 1, text: 'Blood', value: 'Blood' },
        { key: 2, text: 'Slym', value: 'Slym' },
        { key: 3, text: 'Fluor albus', value: 'Fluor albus' },
      ],
      presentasi: [
        { key: 0, text: 'Bokong', value: 'Bokong' },
        { key: 1, text: 'Jari tangan', value: 'Jari tangan' },
        { key: 2, text: 'Kaki', value: 'Kaki' },
        {
          key: 3,
          text: 'Kepala dengan ubun-ubun melintang kiri',
          value: 'Kepala dengan ubun-ubun melintang kiri',
        },
        {
          key: 4,
          text: 'Kepala dengan ubun-ubun melintang kanan',
          value: 'Kepala dengan ubun-ubun melintang kanan',
        },
        { key: 5, text: 'Muka', value: 'Muka' },
        { key: 6, text: 'Tali pusat', value: 'Tali pusat' },
      ],
    },
    anastesi: {
      renal: [
        { key: 0, text: 'Berat badan turun', value: 'Berat badan turun' },
        { key: 1, text: 'DM', value: 'DM' },
        {
          key: 2,
          text: 'Gagal ginjal/dialisis',
          value: 'Gagal ginjal/dialisis',
        },
        { key: 3, text: 'ISK', value: 'ISK' },
        { key: 4, text: 'Penyakit thyroid', value: 'Penyakit thyroid' },
        { key: 5, text: 'Retensi urine', value: 'Retensi urine' },
      ],
    },
    bayi: {
      kelainan: [
        { key: 0, text: 'Tidak ada', value: 'Tidak ada' },
        { key: 1, text: 'Epispadia', value: 'Epispadia' },
        { key: 2, text: 'Hipospadia', value: 'Hipospadia' },
        { key: 3, text: 'Micropenis', value: 'Micropenis' },
        { key: 4, text: 'Testis belum turun', value: 'Testis belum turun' },
        { key: 5, text: 'Labia mayora', value: 'Labia mayora' },
        { key: 6, text: 'Belum menutup', value: 'Belum menutup' },
        { key: 7, text: 'Pseudomenstruasi', value: 'Pseudomenstruasi' },
        { key: 8, text: 'Sexambiguous', value: 'Sexambiguous' },
      ],
    },
  },
  extermitas: {
    umum: {
      arteri: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
      iv: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
          { key: 8, text: 'Kaki kanan', value: 'Kaki kanan' },
          { key: 9, text: 'Kaki kiri', value: 'Kaki kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
      vena: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
          { key: 8, text: 'Kaki kanan', value: 'Kaki kanan' },
          { key: 9, text: 'Kaki kiri', value: 'Kaki kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
    },
    bersalin: {
      arteri: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
      iv: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
          { key: 8, text: 'Kaki kanan', value: 'Kaki kanan' },
          { key: 9, text: 'Kaki kiri', value: 'Kaki kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
      vena: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
          { key: 8, text: 'Kaki kanan', value: 'Kaki kanan' },
          { key: 9, text: 'Kaki kiri', value: 'Kaki kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
    },
    anastesi: {
      arteri: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
      iv: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
          { key: 8, text: 'Kaki kanan', value: 'Kaki kanan' },
          { key: 9, text: 'Kaki kiri', value: 'Kaki kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
      vena: {
        lokasi: [
          { key: 0, text: 'Tangan kanan', value: 'Tangan kanan' },
          { key: 1, text: 'Tangan kiri', value: 'Tangan kiri' },
          { key: 2, text: 'Femoralis kanan', value: 'Femoralis kanan' },
          { key: 3, text: 'Femoralis kiri', value: 'Femoralis kiri' },
          { key: 4, text: 'Jaguralis kanan', value: 'Jaguralis kanan' },
          { key: 5, text: 'Jaguralis kiri', value: 'Jaguralis kiri' },
          { key: 6, text: 'Subelavia kanan', value: 'Subelavia kanan' },
          { key: 7, text: 'Subelavia kiri', value: 'Subelavia kiri' },
          { key: 8, text: 'Kaki kanan', value: 'Kaki kanan' },
          { key: 9, text: 'Kaki kiri', value: 'Kaki kiri' },
        ],
        keadaan: [
          { key: 0, text: 'Baik / Lancar', value: 'Baik / Lancar' },
          { key: 1, text: 'Bersih', value: 'Bersih' },
          { key: 2, text: 'Kemerahan', value: 'Kemerahan' },
          { key: 3, text: 'Bengkak', value: 'Bengkak' },
          { key: 4, text: 'Nyeri', value: 'Nyeri' },
          {
            key: 5,
            text: 'Kotor / Tidak lancar',
            value: 'Kotor / Tidak lancar',
          },
        ],
        balutan: [
          { key: 0, text: 'Bebat', value: 'Bebat' },
          { key: 1, text: 'Irigasi', value: 'Irigasi' },
          { key: 2, text: 'Fraktur', value: 'Fraktur' },
        ],
      },
    },
  },
};

export default CheckboxOptions;
