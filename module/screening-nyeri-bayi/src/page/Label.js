import React from 'react';

const ScreeningNyeriBayiLabel = {
  headerLabel: 'Screening Nyeri',
  descriptionLabel: 'CRIES (< 7 bulan)',
  formLabel: [
    { key: 'menangis', label: 'Kondisi tangisan', default: 'menangis' },
    {
      key: 'oksigen',
      label: (
        <div>
          Kebutuhan O<sub>2</sub> untuk SaO<sub>2</sub> {'<'} 95%
        </div>
      ),
      default: 'oksigen',
    },
    {
      key: 'tanda_vital',
      label: 'Peningkatan tanda-tanda vital BP dan HR',
      default: 'tandaVital',
    },
    { key: 'wajah', label: 'Ekspresi wajah', default: 'wajah' },
    { key: 'tidur', label: 'Kondisi tidur', default: 'tidur' },
    { key: 'luka', label: 'Luka' },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
    { key: 'intervensi', label: 'Intervensi' },
    { key: 'obat_nyeri' },
  ],
  menangis: [
    { key: 0, text: 'Tidak menangis', value: 0, default: true },
    { key: 1, text: 'Menangis tanpa intonasi tinggi (melengking)', value: 0 },
    {
      key: 2,
      text: 'Menangis dengan intonasi tinggi namun bayi mudah ditenangkan',
      value: 1,
    },
    {
      key: 3,
      text: 'Menangis dengan intonasi tinggi yang tidak dapat ditenangkan',
      value: 2,
    },
  ],
  oksigen: [
    { key: 0, text: 'Tidak memerlukan oksigen', value: 0, default: true },
    { key: 1, text: 'Oksigen yang diperlukan < 30%', value: 1 },
    { key: 2, text: 'Oksigen yang diperlukan > 30%', value: 2 },
  ],
  tandaVital: [
    {
      key: 0,
      text:
        'Baik nadi dan tekanan darah tidak berubah atau dibawah nilai normal',
      value: 0,
      default: true,
    },
    {
      key: 1,
      text:
        'Nadi atau tekanan darah meningkat namun masih < 20% dari nilai dasar',
      value: 1,
    },
    {
      key: 2,
      text: 'Nadi atau tekanan darah meningkat > 20% dari nilai dasar',
      value: 2,
    },
  ],
  wajah: [
    {
      key: 0,
      text: 'Tidak ada ekspresi wajah meringis',
      value: 0,
      default: true,
    },
    { key: 1, text: 'Wajah meringis', value: 1 },
    { key: 2, text: 'Wajah meringis, menangis tanpa suara', value: 2 },
  ],
  tidur: [
    { key: 0, text: 'Bayi selama ini tidur nyenyak', value: 0, default: true },
    { key: 1, text: 'Bayi terkadang terbangun', value: 1 },
    { key: 2, text: 'Bayi seringkali terbangun', value: 2 },
  ],
  intervensi: [
    { key: 0, label: 'Memberikan kompres dingin' },
    { key: 1, label: 'Memberikan kompres panas' },
    { key: 2, label: 'Memperbaiki posisi pasien' },
    { key: 3, label: 'Memijat' },
    { key: 4, label: 'Memperdengarkan musik' },
    { key: 5, label: 'Memberikan tindakan TENS' },
    { key: 6, label: 'Menganjurkan relaksasi dan pernafasan' },
    { key: 7, label: 'Farmakologi' },
  ],
};

export default ScreeningNyeriBayiLabel;
