const ScreeningDepresiGeriatriLabel = {
  headerLabel: 'Screening Depresi Geriatri',
  descriptionLabel: '',
  formLabel: [
    {
      index: 0,
      key: 'kehidupan',
      label: 'Apakah anda puas dengan kehidupan anda?',
      default: 'kehidupan',
    },
    {
      index: 1,
      key: 'kegiatan',
      label:
        'Apakah anda telah meninggalkan banyak kegiatan & minat/kesenangan anda?',
      default: 'kegiatan',
    },
    {
      index: 2,
      key: 'kosong',
      label: 'Apakah anda merasa kehidupan anda kosong?',
      default: 'kosong',
    },
    {
      index: 3,
      key: 'bosan',
      label: 'Apakah anda sering merasa bosan?',
      default: 'bosan',
    },
    {
      index: 4,
      key: 'semangat',
      label: 'Apakah anda mempunyai semangat yang baik setiap saat?',
      default: 'semangat',
    },
    {
      index: 5,
      key: 'takut',
      label:
        'Apakah anda merasa takut sesuatu yang buruk akan terjadi pada anda?',
      default: 'takut',
    },
    {
      index: 6,
      key: 'bahagia',
      label: 'Apakah anda merasa bahagia untuk sebagian besar hidup anda?',
      default: 'bahagia',
    },
    {
      index: 7,
      key: 'tidak_berdaya',
      label: 'Apakah anda sering merasa tidak berdaya?',
      default: 'tidakBerdaya',
    },
    {
      index: 8,
      key: 'rumah',
      label:
        'Apakah anda lebih sering di rumah daripada pergi keluar untuk mengerjakan sesuatu hal yang baru?',
      default: 'rumah',
    },
    {
      index: 9,
      key: 'masalah',
      label:
        'Apakah anda merasa mempunyai banyak masalah dengan daya ingat dibandingkan dengan kebanyakan orang?',
      default: 'masalah',
    },
    {
      index: 10,
      key: 'senang',
      label: 'Apakah anda fikir bahwa kehidupan anda sekarang menyenangkan?',
      default: 'senang',
    },
    {
      index: 11,
      key: 'perasaan',
      label:
        'Apakah anda merasa tidak berharga seperti perasaan anda saat ini?',
      default: 'perasaan',
    },
    {
      index: 12,
      key: 'penuh_semangat',
      label: 'Apakah anda merasa penuh semangat?',
      default: 'penuhSemangat',
    },
    {
      index: 13,
      key: 'harapan',
      label: 'Apakah anda merasa bahwa keadaan anda tidak berpengharapan?',
      default: 'harapan',
    },
    {
      index: 14,
      key: 'keadaan',
      label:
        'Apakah anda fikir orang lain lebih baik keadaannya daripada anda?',
      default: 'keadaan',
    },
    { index: 15, key: 'total', label: 'Total' },
    { index: 16, key: 'kesimpulan', label: 'Kesimpulan' },
  ],
  kehidupan: [
    { key: 0, text: 'Tidak', value: 1 },
    { key: 1, text: 'Ya', value: 0, default: true },
  ],
  kegiatan: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  kosong: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  bosan: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  semangat: [
    { key: 0, text: 'Tidak', value: 1 },
    { key: 1, text: 'Ya', value: 0, default: true },
  ],
  takut: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  bahagia: [
    { key: 0, text: 'Tidak', value: 1 },
    { key: 1, text: 'Ya', value: 0, default: true },
  ],
  tidakBerdaya: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  rumah: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  masalah: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  senang: [
    { key: 0, text: 'Tidak', value: 1 },
    { key: 1, text: 'Ya', value: 0, default: true },
  ],
  perasaan: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  penuhSemangat: [
    { key: 0, text: 'Tidak', value: 1 },
    { key: 1, text: 'Ya', value: 0, default: true },
  ],
  harapan: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
  keadaan: [
    { key: 0, text: 'Tidak', value: 0 },
    { key: 1, text: 'Ya', value: 1, default: true },
  ],
};

export default ScreeningDepresiGeriatriLabel;
