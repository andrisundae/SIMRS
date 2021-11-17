import React, { useState, useReducer, useEffect } from 'react';
import dayjs from 'dayjs';
import ComponentFunction from './ComponentFunction';

import AnamnesisMultiSelect from './anamnesis-type/AnamnesisMultiSelect';
import AnamnesisSelective from './anamnesis-type/AnamnesisSelective';

const AnamnesisTempData = [
  {
    kode: '180185692010002001005',
    kode_personel: 'LINKAR001',
    kode_ppa: 'medis',
    kode_kunjungan_tl: '180185692010002001',
    sumber_informasi: [
      {
        value: 'Allo-anamnesis',
        data: 'Keluarga Pasien',
        detail: 'Orang tua',
      },
    ],
    keluhan_utama: 'nyeri luka kaki',
    riwayat_penyakit_sekarang:
      'nyeri luka pada kaki sejak 2 bulan yang lalu, memberat terasa nyeri sejak 4 hari yang lalu. pasien mengeluh mual sejak kemarin nafsu makan menurun sejak 4 hari terakhir. badan terasa lemas. muntah (-) demam (-) riwayat DM sudah lama biasa kontrol di puskesmas, sempat putus kontrol dan baru kembali kontrol 2 bulan terakhir.  dari puskesmas biasa dapat obat glimepirid',
    riwayat_penyakit_dahulu: 'DM (+) HT (-)',
    riwayat_alergi: {
      obat: [
        {
          kode: '00001',
          nama: 'AMOXICILLIN',
        },
        {
          kode: '00003',
          nama: 'ALBUMIN',
        },
      ],
      makanan: '-',
      lainnya: '-',
    },
    riwayat_alergi_reaksi: '-',
    riwayat_penyakit_keluarga: '-',
    riwayat_lain: {
      merokok: {
        jumlah: '1',
        lama: '1 bulan',
      },
      alkohol: {
        jenis: 'miras',
        jumlah: '1',
        lama: '1 bulan',
      },
      obat_penenang: {
        jenis: 'obat keras',
        jumlah: '1',
        lama: '1 bulan',
      },
      pekerjaan: 'cairan alkali',
      tumbuh_kembang: null,
      persalinan: null,
    },
    riwayat_obat: 'obat lain',
    status_psikologi: [
      {
        value: 'Sedih',
        data: 'Sedih',
      },
      {
        value: 'Tegang',
        data: 'Tegang',
      },
      {
        value: 'Menderita penyakit yang membahayakan dirinya sendiri',
        data: 'Menderita penyakit yang membahayakan dirinya sendiri',
      },
      {
        value: 'Lainnya',
        data: 'lainnya',
      },
    ],
    alat_bantu: [
      {
        value: 'Kursi Roda',
        data: 'Kursi Roda',
      },
      {
        value: 'Kruk',
        data: 'Kruk',
      },
      {
        value: 'Lainnya',
        data: 'lainnya',
      },
    ],
    kelainan_fisik: [
      {
        value: 'Bisu',
        data: 'Bisu',
      },
      {
        value: 'Buta',
        data: 'Buta',
      },
      {
        value: 'Lainnya',
        data: 'lainnya',
      },
    ],
    time_stamp: '2020-12-29 14:06:21.990',
    is_lock: false,
    nama_personel: 'Administrator LINKAR',
    tempat_layanan: 'ANGGREK',
    tanggal_hapus: null,
    kelas: '3',
    hapus: true,
  },
  {
    kode: '180185692010002001002',
    kode_personel: '1810002',
    kode_ppa: 'medis',
    kode_kunjungan_tl: '180185692010002001',
    sumber_informasi: [
      {
        value: 'Auto-anamnesis',
        data: '',
        detail: '',
      },
    ],
    keluhan_utama: 'nyeri luka kaki',
    riwayat_penyakit_sekarang:
      'nyeri luka pada kaki sejak 2 bulan yang lalu, memberat terasa nyeri sejak 4 hari yang lalu. pasien mengeluh mual sejak kemarin nafsu makan menurun sejak 4 hari terakhir. badan terasa lemas. muntah (-) demam (-) riwayat DM sudah lama biasa kontrol di puskesmas, sempat putus kontrol dan baru kembali kontrol 2 bulan terakhir.  dari puskesmas biasa dapat obat glimepirid',
    riwayat_penyakit_dahulu: 'DM (+) HT (-)',
    riwayat_alergi: {
      obat: [],
      makanan: '-',
      lainnya: '-',
    },
    riwayat_alergi_reaksi: '-',
    riwayat_penyakit_keluarga: '-',
    riwayat_lain: {
      merokok: {
        jumlah: null,
        lama: null,
      },
      alkohol: {
        jenis: null,
        jumlah: null,
        lama: null,
      },
      obat_penenang: {
        jenis: null,
        jumlah: null,
        lama: null,
      },
      pekerjaan: '',
      tumbuh_kembang: null,
      persalinan: null,
    },
    riwayat_obat: null,
    status_psikologi: [
      {
        value: 'Sedih',
        data: 'Sedih',
      },
    ],
    alat_bantu: [
      {
        value: 'Tidak Ada',
        data: 'Tidak Ada',
      },
    ],
    kelainan_fisik: [
      {
        value: 'Tidak Ada',
        data: 'Tidak Ada',
      },
    ],
    time_stamp: '2020-10-08 09:18:17.607',
    is_lock: false,
    nama_personel: 'LINDA FDPH, dr., Biomed., SpPD',
    tempat_layanan: 'ANGGREK',
    tanggal_hapus: null,
    kelas: '3',
    hapus: false,
  },
  {
    kode: '180185692010001001001',
    kode_personel: '1810016',
    kode_ppa: 'medis',
    kode_kunjungan_tl: '180185692010001001',
    sumber_informasi: [
      {
        value: 'Auto-anamnesis',
        data: '',
        detail: '',
      },
    ],
    keluhan_utama: 'nyeri luka kaki',
    riwayat_penyakit_sekarang:
      'nyeri luka pada kaki sejak 2 bulan yang lalu, memberat terasa nyeri sejak 4 hari yang lalu. pasien mengeluh mual sejak kemarin nafsu makan menurun sejak 4 hari terakhir. badan terasa lemas. muntah (-) demam (-) riwayat DM sudah lama biasa kontrol di puskesmas, sempat putus kontrol dan baru kembali kontrol 2 bulan terakhir.  dari puskesmas biasa dapat obat glimepirid',
    riwayat_penyakit_dahulu: 'DM (+) HT (-)',
    riwayat_alergi: {
      obat: [],
      makanan: '-',
      lainnya: '-',
    },
    riwayat_alergi_reaksi: '-',
    riwayat_penyakit_keluarga: '-',
    riwayat_lain: {
      merokok: {
        jumlah: null,
        lama: null,
      },
      alkohol: {
        jenis: null,
        jumlah: null,
        lama: null,
      },
      obat_penenang: {
        jenis: null,
        jumlah: null,
        lama: null,
      },
      pekerjaan: '',
      tumbuh_kembang: null,
      persalinan: null,
    },
    riwayat_obat: null,
    status_psikologi: [
      {
        value: 'Sedih',
        data: 'Sedih',
      },
    ],
    alat_bantu: [
      {
        value: 'Tidak Ada',
        data: 'Tidak Ada',
      },
    ],
    kelainan_fisik: [
      {
        value: 'Tidak Ada',
        data: 'Tidak Ada',
      },
    ],
    time_stamp: '2020-10-07 09:26:56.813',
    is_lock: false,
    nama_personel: 'MOH, TAJUL MULUK, dr.',
    tempat_layanan: 'IGD',
    tanggal_hapus: null,
    kelas: 'NON KELAS',
    hapus: false,
  },
];

const BuildAnamnesisParams = (data, props) => {
  let isRiwayatLainMerokok =
      undefined !==
      Object.keys(data.riwayat_lain.merokok).find(
        (key) =>
          '' !== data.riwayat_lain.merokok[key] &&
          null !== data.riwayat_lain.merokok[key]
      ),
    isRiwayatLainAlkohol =
      undefined !==
      Object.keys(data.riwayat_lain.alkohol).find(
        (key) =>
          '' !== data.riwayat_lain.alkohol[key] &&
          null !== data.riwayat_lain.alkohol[key]
      ),
    isRiwayatLainObatPenenang =
      undefined !==
      Object.keys(data.riwayat_lain.obat_penenang).find(
        (key) =>
          '' !== data.riwayat_lain.obat_penenang[key] &&
          null !== data.riwayat_lain.obat_penenang[key]
      ),
    isRiwayatLainPekerjaan =
      '' !== data.riwayat_lain.pekerjaan &&
      null !== data.riwayat_lain.pekerjaan,
    riwayatLain = {
      merokok: isRiwayatLainMerokok
        ? `Jumlah ${data.riwayat_lain.merokok.jumlah}, Lama ${data.riwayat_lain.merokok.lama}`
        : '',
      alkohol: isRiwayatLainAlkohol
        ? `Jenis ${data.riwayat_lain.alkohol.jenis}, Jumlah ${data.riwayat_lain.alkohol.jumlah}, Lama ${data.riwayat_lain.alkohol.lama}`
        : '',
      obat_penenang: isRiwayatLainObatPenenang
        ? `Jenis ${data.riwayat_lain.obat_penenang.jenis}, Jumlah ${data.riwayat_lain.obat_penenang.jumlah}, Lama ${data.riwayat_lain.obat_penenang.lama}`
        : '',
      pekerjaan: isRiwayatLainPekerjaan ? data.riwayat_lain.pekerjaan : '',
    };

  return {
    kode: data.kode,
    time_stamp: dayjs(data.time_stamp).format('DD/MM/YYYY HH:mm'),
    nama_personel: data.nama_personel,
    tempat_layanan: data.tempat_layanan,
    kelas: data.kelas,
    sumber_informasi: (() => {
      if (
        undefined !== data.sumber_informasi &&
        data.sumber_informasi.length > 0
      ) {
        let sumberInformasiTemp = [];
        data.sumber_informasi.map((v) => {
          let tData = v.data !== '' ? ` (${v.data})` : '';
          let tDetail = v.detail !== '' ? `: ${v.detail}` : '';
          sumberInformasiTemp.push(v.value + tDetail + tData);
        });
        return sumberInformasiTemp;
      } else {
        return '';
      }
    })(),
    keluhan_utama: ComponentFunction.EmptyReplace(
      data.keluhan_utama,
      ComponentFunction.EmptyLabel('tanya')
    ),
    riwayat_penyakit_sekarang: ComponentFunction.EmptyReplace(
      data.riwayat_penyakit_sekarang,
      ComponentFunction.EmptyLabel('tanya')
    ),
    riwayat_penyakit_dahulu: ComponentFunction.EmptyReplace(
      data.riwayat_penyakit_dahulu,
      ComponentFunction.EmptyLabel('tanya')
    ),
    riwayat_alergi: {
      obat:
        undefined !== data.riwayat_alergi &&
        (0 === data.riwayat_alergi.obat.length
          ? ComponentFunction.EmptyLabel('ada')
          : data.riwayat_alergi.obat.map((value) => value.nama).join(', ')),
      makanan: ComponentFunction.EmptyReplace(
        (data.riwayat_alergi || {}).makanan,
        ComponentFunction.EmptyLabel('tanya')
      ),
      lainnya: ComponentFunction.EmptyReplace(
        (data.riwayat_alergi || {}).lainnya,
        ComponentFunction.EmptyLabel('tanya')
      ),
    },
    riwayat_alergi_reaksi: ComponentFunction.EmptyReplace(
      data.riwayat_alergi_reaksi,
      ComponentFunction.EmptyLabel('tanya')
    ),
    riwayat_penyakit_keluarga: ComponentFunction.EmptyReplace(
      data.riwayat_penyakit_keluarga,
      ComponentFunction.EmptyLabel('tanya')
    ),
    riwayat_lain: riwayatLain,
    riwayat_obat: data.riwayat_obat,
    status_ppa: {
      status: props.noKodePPA ? 'all' : 'partial',
      kode: data.kode_ppa,
    },
    status_psikologi:
      undefined !== data.status_psikologi && null !== data.status_psikologi
        ? data.status_psikologi.length > 0
          ? data.status_psikologi
              .map((v) => {
                return v.data;
              })
              .join(', ')
          : data.status_psikologi.join('')
        : ComponentFunction.EmptyLabel('tanya'),
    kelainan_fisik:
      undefined !== data.kelainan_fisik && null !== data.kelainan_fisik
        ? data.kelainan_fisik.length > 0
          ? data.kelainan_fisik
              .map((v) => {
                return v.data;
              })
              .join(', ')
          : data.kelainan_fisik.join('')
        : ComponentFunction.EmptyLabel('tanya'),
    alat_bantu:
      undefined !== data.alat_bantu && null !== data.alat_bantu
        ? data.alat_bantu.length > 0
          ? data.alat_bantu
              .map((v) => {
                return v.data;
              })
              .join(', ')
          : data.alat_bantu.join('')
        : ComponentFunction.EmptyLabel('tanya'),
  };
};

const Anamnesis = (props) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [data, setData] = useState(AnamnesisTempData);

  useEffect(() => {
    if (AnamnesisTempData.length > 0) {
      const tempData = [];
      AnamnesisTempData.map((v) => {
        if (!v.hapus) {
          tempData.push(v);
        }
        return null;
      });
      setData(tempData);
    }
  }, []);

  if (props.selective) {
    return <AnamnesisSelective {...props} params={{ data, forceUpdate }} />;
  } else {
    return <AnamnesisMultiSelect {...props} params={{ data, forceUpdate }} />;
  }
};

export { Anamnesis as default, BuildAnamnesisParams };
