const ScreeningNyeriAnakLabel = {
  headerLabel: 'Screening Nyeri',
  descriptionLabel: 'FLACC (7 bulan - 7 tahun)',
  formLabel: [
    { key: 'wajah', label: 'Wajah', default: 'wajah' },
    { key: 'kaki', label: 'Kaki', default: 'kaki' },
    { key: 'aktivitas', label: 'Aktivitas', default: 'aktivitas' },
    { key: 'menangis', label: 'Menagis', default: 'menangis' },
    { key: 'suara', label: 'Bicara / Suara', default: 'suara' },
    { key: 'luka', label: 'Luka' },
    { key: 'total', label: 'Total' },
    { key: 'kesimpulan', label: 'Kesimpulan' },
    { key: 'intervensi', label: 'Intervensi' },
    { key: 'obat_nyeri' },
  ],
  wajah: [
    { key: 0, text: 'Expresi wajah normal', value: 0, default: true },
    { key: 1, text: 'Expresi wajah kadang menangis menahan sakit', value: 1 },
    {
      key: 2,
      text: 'Sering meringis, menggertakkan gigi menahan sakit',
      value: 2,
    },
  ],
  kaki: [
    { key: 0, text: 'Kaki normal', value: 0, default: true },
    { key: 1, text: 'Kaki kaku', value: 1 },
    { key: 2, text: 'Kaki menendang-nendang', value: 2 },
  ],
  aktivitas: [
    {
      key: 0,
      text: 'Berbaring tenang, posisi normal, gerakan normal',
      value: 0,
      default: true,
    },
    { key: 1, text: 'Gelisah, berguling-guling', value: 1 },
    {
      key: 2,
      text:
        'Kaku, gerakan abnormal (posisi tubuh melengkung atau gerakan menyentak)',
      value: 2,
    },
  ],
  menangis: [
    { key: 0, text: 'Tidak menangis (tenang)', value: 0, default: true },
    {
      key: 1,
      text: 'Mengerang atau merengek, kadang-kadang mengeluh',
      value: 1,
    },
    {
      key: 2,
      text: 'Menangis terus menerus, menjerit, seringkali mengeluh',
      value: 2,
    },
  ],
  suara: [
    {
      key: 0,
      text: 'Bicara atau bersuara normal sesuai usia',
      value: 0,
      default: true,
    },
    {
      key: 1,
      text: 'Tenang setelah dipegang, dipeluk, digendong, atau diajak bicara',
      value: 1,
    },
    {
      key: 2,
      text: 'Sulit ditenangkan dengan kata-kata atau pelukan',
      value: 2,
    },
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

export default ScreeningNyeriAnakLabel;
