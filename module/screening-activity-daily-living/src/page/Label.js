const ScreeningADLLabel = {
  headerLabel: 'Screening Activity Daily Living',
  descriptionLabel: '',
  formLabel: [
    { index: 0, key: 'makan', label: 'Makan', default: 'makan' },
    { index: 1, key: 'mandi', label: 'Mandi', default: 'mandi' },
    { index: 2, key: 'berpakaian', label: 'Berpakaian', default: 'berpakaian' },
    {
      index: 3,
      key: 'merawat_diri',
      label: 'Merawat diri',
      default: 'merawatDiri',
    },
    {
      index: 4,
      key: 'bak',
      label: 'Mengendalikan rangsangan BAK',
      default: 'bak',
    },
    {
      index: 5,
      key: 'bab',
      label: 'Mengendalikan rangsangan BAB',
      default: 'bab',
    },
    { index: 6, key: 'jamban', label: 'Penggunaan jamban', default: 'jamban' },
    { index: 7, key: 'transfer', label: 'Transfer', default: 'transfer' },
    {
      index: 8,
      key: 'pindah',
      label: 'Berpindah / Berjalan',
      default: 'pindah',
    },
    {
      index: 9,
      key: 'tangga',
      label: 'Menaiki / Menuruni tangga',
      default: 'tangga',
    },
    { index: 10, key: 'total', label: 'Total' },
    { index: 11, key: 'kesimpulan', label: 'Kesimpulan' },
  ],
  makan: [
    {
      key: 0,
      text: 'Tidak mampu melakukannya sendiri',
      value: 0,
      default: true,
    },
    { key: 1, text: 'Sebagian dibantu, memotong lauk misalnya', value: 5 },
    { key: 2, text: 'Mandiri', value: 10 },
  ],
  mandi: [
    { key: 0, text: 'Tergantung orang lain', value: 0, default: true },
    { key: 1, text: 'Mandiri', value: 5 },
  ],
  berpakaian: [
    { key: 0, text: 'Tergantung', value: 0, default: true },
    { key: 1, text: 'Sebagian dibantu, mengancing baju misalnya', value: 5 },
    { key: 2, text: 'Mandiri', value: 10 },
  ],
  merawatDiri: [
    { key: 0, text: 'Membutuhkan bantuan orang lain', value: 0, default: true },
    { key: 1, text: 'Mandiri', value: 5 },
  ],
  bak: [
    {
      key: 0,
      text: 'Tak terkendali / menggunakan catheter',
      value: 0,
      default: true,
    },
    {
      key: 1,
      text: 'Kadang-kadang tak terkendali (hanya 1x selama 24 jam)',
      value: 5,
    },
    { key: 2, text: 'Normal', value: 10 },
  ],
  bab: [
    {
      key: 0,
      text: 'Tak terkendali / tak teratur / butuh pencahar',
      value: 0,
      default: true,
    },
    { key: 1, text: 'Kadang-kadang tak terkendali (1x seminggu)', value: 5 },
    { key: 2, text: 'Terkendali teratur', value: 10 },
  ],
  jamban: [
    { key: 0, text: 'Tergantung bantuan orang lain', value: 0, default: true },
    {
      key: 1,
      text:
        'Membutuhkan bantuan tetapi masih dapat melakukan beberapa hal sendiri',
      value: 5,
    },
    { key: 2, text: 'Mandiri', value: 10 },
  ],
  transfer: [
    { key: 0, text: 'Tidak mampu', value: 0, default: true },
    {
      key: 1,
      text: 'Membutuhkan bantuan (2 orang) untuk bisa duduk',
      value: 5,
    },
    { key: 2, text: 'Hanya memerlukan bantuan 1 orang', value: 10 },
    { key: 3, text: 'Mandiri', value: 15 },
  ],
  pindah: [
    { key: 0, text: 'Tidak mampu', value: 0, default: true },
    { key: 1, text: 'Menggunakan kursi roda', value: 5 },
    { key: 2, text: 'Berjalan dengan bantuan 1 orang', value: 10 },
    { key: 3, text: 'Mandiri', value: 15 },
  ],
  tangga: [
    { key: 0, text: 'Tidak mampu', value: 0, default: true },
    { key: 1, text: 'Membutuhkan bantuan', value: 5 },
    { key: 2, text: 'Mandiri', value: 10 },
  ],
};

export default ScreeningADLLabel;
