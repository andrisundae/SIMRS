const screeningLabel = 'Screening';
const screeningSource = 'screening';

const source = [
  {
    text: 'Master Diagnosis',
    children: [
      { text: 'Apoteker', value: 'master_diagnosis_apoteker' },
      { text: 'Bidan', value: 'master_diagnosis_bidan' },
      { text: 'Fisioterapis', value: 'master_diagnosis_fisioterapis' },
      { text: 'Nutrisionis', value: 'master_diagnosis_nutrisionis' },
      { text: 'Paramedis', value: 'master_diagnosis_paramedis' },
      {
        text: 'Diagnosis ICD IX (All) (Multi Select Row)',
        value: 'master_diagnosis_ix_all_multiselect',
      },
      {
        text: 'Diagnosis ICD X (All) (Multi Select Row)',
        value: 'master_diagnosis_x_all_multiselect',
      },
    ],
  },
  {
    text: 'Kunjungan',
    children: [
      { text: 'Asal Masuk', value: 'asal_masuk' },
      { text: 'Tanggal Masuk', value: 'tgl_masuk' },
      { text: 'Usia Dirawat', value: 'usia_dirawat' },
      { text: 'Tanggal Pulang', value: 'tgl_pulang' },
      { text: 'Tanggal Meninggal', value: 'tgl_meninggal' },
      { text: 'Riwayat Personal', value: 'riwayat_personal' },
    ],
  },
  {
    text: 'Pre-Hospital',
    children: [{ text: 'All', value: 'pre_hospital' }],
  },
  {
    text: 'Pemeriksaan ABCDE',
    children: [
      { text: 'Medis', value: 'pengkajian_gawat_darurat_medis' },
      { text: 'Paramedis', value: 'pengkajian_gawat_darurat_paramedis' },
      { text: 'Semua PPA', value: 'pengkajian_gawat_darurat_all' },
    ],
  },
  {
    text: screeningLabel + ' Apgar Score',
    children: [{ text: 'Semua data', value: screeningSource + '_apgar_score' }],
  },
  {
    text: screeningLabel + ' Downe Score',
    children: [{ text: 'Semua data', value: screeningSource + '_downe_score' }],
  },
  {
    text: screeningLabel + ' Resiko Jatuh',
    children: [
      {
        text: screeningLabel + ' Awal (Kesimpulan saja)',
        value: screeningSource + '_jatuh_awal_kesimpulan',
      },
      {
        text: screeningLabel + ' Awal (Dengan Item / Detail)',
        value: screeningSource + '_jatuh_awal_item',
      },
      { text: 'All', value: screeningSource + '_jatuh' },
    ],
  },
  {
    text: screeningLabel + ' Risiko Jatuh Morse Falls Scale',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_jatuh_dewasa_awal',
      },
      { text: 'All', value: screeningSource + '_jatuh_dewasa' },
    ],
  },
  {
    text: screeningLabel + ' Risiko Jatuh Humpty Dumpty',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_jatuh_anak_awal',
      },
      { text: 'All', value: screeningSource + '_jatuh_anak' },
    ],
  },
  {
    text: screeningLabel + ' Risiko Jatuh Ontario Modified Stratify',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_jatuh_lansia_awal',
      },
      { text: 'All', value: screeningSource + '_jatuh_lansia' },
    ],
  },
  {
    text: screeningLabel + ' Risiko Jatuh Time Up & Go',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_jatuh_rawat_jalan_awal',
      },
      { text: 'All', value: screeningSource + '_jatuh_rawat_jalan' },
    ],
  },
  {
    text: screeningLabel + ' Risiko Jatuh Geriatri',
    children: [{ text: 'All', value: screeningSource + '_jatuh_geriatri' }],
  },
  {
    text: screeningLabel + ' Nyeri',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_nyeri_awal',
      },
      { text: 'All', value: screeningSource + '_nyeri' },
    ],
  },
  {
    text: screeningLabel + ' Nyeri Wong Baker Faces (Numeric Pain Scale)',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_nyeri_wong_baker_awal',
      },
      { text: 'All', value: screeningSource + '_nyeri_wong_baker' },
    ],
  },
  {
    text: screeningLabel + ' Nyeri Numeric',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_nyeri_numeric_awal',
      },
      { text: 'All', value: screeningSource + '_nyeri_numeric' },
    ],
  },
  {
    text: screeningLabel + ' Nyeri Cries',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_nyeri_cries_awal',
      },
      { text: 'All', value: screeningSource + '_nyeri_cries' },
    ],
  },
  {
    text: screeningLabel + ' Nyeri FLACC',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_nyeri_flacc_awal',
      },
      { text: 'All', value: screeningSource + '_nyeri_flacc' },
    ],
  },
  {
    text: screeningLabel + ' Nyeri Geriatri',
    children: [{ text: 'All', value: screeningSource + '_nyeri_geriatri' }],
  },
  {
    text: screeningLabel + ' Gizi',
    children: [
      { text: screeningLabel + ' Awal', value: screeningSource + '_gizi_awal' },
      { text: 'All', value: screeningSource + '_gizi' },
    ],
  },
  {
    text: screeningLabel + ' Gizi Dewasa',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_gizi_dewasa_awal',
      },
      { text: 'All', value: screeningSource + '_gizi_dewasa' },
    ],
  },
  {
    text: screeningLabel + ' Gizi Anak',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_gizi_anak_awal',
      },
      { text: 'All', value: screeningSource + '_gizi_anak' },
    ],
  },
  {
    text: screeningLabel + ' Gizi Obstetri',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_gizi_obstetri_awal',
      },
      { text: 'All', value: screeningSource + '_gizi_obstetri' },
    ],
  },
  {
    text: 'Intervensi Gizi',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_lanjutan_gizi_awal',
      },
      { text: 'All', value: screeningSource + '_lanjutan_gizi' },
    ],
  },
  {
    text: screeningLabel + ' Activity Daily Living',
    children: [
      { text: screeningLabel + ' Awal', value: screeningSource + '_adl_awal' },
      { text: 'All', value: screeningSource + '_adl' },
    ],
  },
  {
    text: screeningLabel + ' Decubitus Norton Scale',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_decubitus_awal',
      },
      { text: 'All', value: screeningSource + '_decubitus' },
    ],
  },
  {
    text: screeningLabel + ' Depresi Geriatri',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_depresi_geriatri_awal',
      },
      { text: 'All', value: screeningSource + '_depresi_geriatri' },
    ],
  },
  {
    text: screeningLabel + ' Status Mental',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_status_mental_awal',
      },
      { text: 'All', value: screeningSource + '_status_mental' },
    ],
  },
  {
    text: screeningLabel + ' Gerak Dasar',
    children: [
      {
        text: screeningLabel + ' Awal',
        value: screeningSource + '_gerak_dasar_awal',
      },
      { text: 'All', value: screeningSource + '_gerak_dasar' },
    ],
  },
  {
    text: screeningLabel + ' Riwayat Persalinan',
    children: [
      {
        text: 'All (Multi Select)',
        value: screeningSource + '_riwayat_persalinan',
      },
    ],
  },
  {
    text: screeningLabel + ' Riwayat Kehamilan',
    children: [
      {
        text: 'All (Multi Select)',
        value: screeningSource + '_riwayat_kehamilan',
      },
    ],
  },
  {
    text: 'Anamnesis',
    children: [
      { text: 'Anamnesis Awal', value: 'anamnesis_awal' },
      { text: 'Medis', value: 'anamnesis_medis' },
      { text: 'Paramedis', value: 'anamnesis_paramedis' },
      { text: 'Nutrisionis', value: 'anamnesis_nutrisionis' },
      { text: 'Bidan', value: 'anamnesis_bidan' },
      { text: 'Fisioterapis', value: 'anamnesis_fisioterapis' },
      { text: 'Apoteker', value: 'anamnesis_apoteker' },
      { text: 'Semua PPA', value: 'anamnesis_all' },
      { text: 'Semua PPA (Khusus untuk klaim)', value: 'anamnesis_all_klaim' },
      { text: 'Semua PPA (Select Cell)', value: 'anamnesis_all_selective' },
      {
        text: 'Semua PPA (Tanpa Pengguna, Tanpa KU & Riwayat Penyakit Sekarang',
        value: 'anamnesis_all_optional',
      },
      {
        text: 'Riwayat Gizi (Dari Anamnesis)',
        value: 'anamnesis_all_optional_gizi',
      },
      {
        text: 'Riwayat Obat (Dari Anamnesis)',
        value: 'anamnesis_all_optional_obat',
      },
    ],
  },
  {
    text: 'Pemeriksaan Umum',
    children: [
      { text: 'All Awal', value: 'pemeriksaan_umum_awal' },
      { text: 'Keadaan Umum Awal', value: 'keadaan_umum_awal' },
      {
        text: 'Keadaan Umum Awal (AVPU / GCS)',
        value: 'keadaan_umum_awal_optional',
      },
      { text: 'Keadaan Umum & TTV Awal', value: 'keadaan_umum_ttv_awal' },
      { text: 'Keadaan Umum', value: 'keadaan_umum' },
      { text: 'TTV Awal', value: 'ttv_awal' },
      { text: 'TTV & Antropometri Awal', value: 'ttv_antropometri_awal' },
      { text: 'TTV', value: 'ttv' },
      { text: 'TTV (Multi Select Row)', value: 'ttv_multiselect' },
      { text: 'Status Emergency Awal', value: 'status_emergency_awal' },
      { text: 'Status Emergency', value: 'status_emergency' },
      { text: 'Antropometri Awal', value: 'antropometri_awal' },
      { text: 'Antropometri', value: 'antropometri' },
      { text: 'Urine Awal', value: 'urine_awal' },
      { text: 'Urine & Faeces Awal', value: 'urine_faeces_awal' },
      { text: 'Urine', value: 'urine' },
      { text: 'Faeces Awal', value: 'faeces_awal' },
      { text: 'Faeces', value: 'faeces' },
      { text: 'Pemeriksaan Lain Awal', value: 'pemeriksaan_lain_awal' },
      { text: 'Pemeriksaan Lain', value: 'pemeriksaan_lain' },
    ],
  },
  {
    text: 'Pemeriksaan Fisik 2',
    children: [
      { text: 'Semua PPA & Status', value: 'pemeriksaan_fisik2' },
      { text: 'Medis', value: 'pemeriksaan_fisik2_medis' },
    ],
  },
  {
    text: 'CPPT',
    children: [
      { text: 'Semua data (Multi Select Row)', value: 'cppt_multiselect' },
      { text: 'Semua data (Select Cell)', value: 'cppt_selective' },
      {
        text: 'Semua data (Hanya Spesialis) (Multi Select Row)',
        value: 'cppt_dokter_multiselect',
      },
      {
        text: 'Hanya data Subject (Multi Select Row)',
        value: 'cppt_data_subject_multiselect',
      },
      {
        text: 'Hanya data Object (Multi Select Row)',
        value: 'cppt_data_object_multiselect',
      },
      {
        text: 'Hanya data Planning (All) (Multi Select Row)',
        value: 'cppt_data_planning_all_multiselect',
      },
      {
        text: 'Hanya data Planning (Hanya Spesialis) (Multi Select Row)',
        value: 'cppt_data_planning_spesialis_multiselect',
      },
      {
        text: 'Hanya data Planning (Hanya Paramedis) (Multi Select Row)',
        value: 'cppt_data_planning_paramedis_multiselect',
      },
      {
        text: 'Hanya data Implementation (All) (Multi Select Row)',
        value: 'cppt_data_implementation_all_multiselect',
      },
      {
        text: 'Hanya data Implementation (Hanya Spesialis) (Multi Select Row)',
        value: 'cppt_data_implementation_spesialis_multiselect',
      },
      {
        text: 'Hanya data Implementation (Hanya Paramedis) (Multi Select Row)',
        value: 'cppt_data_implementation_paramedis_multiselect',
      },
      {
        text: 'Hanya data Instruction (All) (Multi Select Row)',
        value: 'cppt_data_instruction_all_multiselect',
      },
      {
        text: 'Hanya data Instruction (Hanya Spesialis) (Multi Select Row)',
        value: 'cppt_data_instruction_spesialis_multiselect',
      },
      {
        text: 'Hanya data Instruction (Hanya Paramedis) (Multi Select Row)',
        value: 'cppt_data_instruction_paramedis_multiselect',
      },
      {
        text: 'Semua data (Sebelum dan Sesudah) (Multi Select Row)',
        value: 'cppt_before_after_multiselect',
      },
      {
        text: 'Semua data (Sebelum dan Sesudah) (Select Cell)',
        value: 'cppt_before_after_selective',
      },
      {
        text: 'Hanya data Subject (Tanpa Label)',
        value: 'cppt_data_subject_no_label',
      },
      {
        text: 'Hanya data Object (Tanpa Label)',
        value: 'cppt_data_object_no_label',
      },
      {
        text: 'Hanya data Planning (Tanpa Label)',
        value: 'cppt_data_planning_no_label',
      },
      {
        text: 'Hanya data Instruction (Tanpa Label)',
        value: 'cppt_data_instruction_no_label',
      },
      {
        text: 'Hanya data Implementation (Tanpa Label)',
        value: 'cppt_data_implementation_no_label',
      },
    ],
  },
  {
    text: 'Diagnosis (ICD IX)',
    children: [
      { text: 'All (Multi Select Row)', value: 'diagnosis_ix' },
      {
        text: 'Diagnosis 6 Bulan Terakhir (Multi Select Row)',
        value: 'diagnosis_ix_six_month',
      },
    ],
  },
  {
    text: 'Diagnosis (ICD X)',
    children: [
      { text: 'All (Multi Select Row)', value: 'diagnosis_x' },
      {
        text:
          'Diagnosis Utama (Spesialis) (Dx terakhir tiap Dokter) (Multi Select Row)',
        value: 'diagnosis_x_utama_dokter_last_multiselect',
      },
      {
        text:
          'Diagnosis Penyerta (Spesialis) (Dx terakhir tiap Dokter) (Multi Select Row)',
        value: 'diagnosis_x_penyerta_dokter_last_multiselect',
      },
      {
        text:
          'All (Spesialis) (Tanpa Pelaksana & Peringkat) (Multi Select Row)',
        value: 'diagnosis_x_tanpa_pelaksana_peringkat_multiselect',
      },
      {
        text: 'Diagnosis 6 Bulan Terakhir (Multi Select Row)',
        value: 'diagnosis_x_six_month',
      },
    ],
  },
  {
    text: 'Diagnosis Lainnya',
    children: [
      {
        text: 'All (Dari CPPT) (Multi Select Row)',
        value: 'cppt_data_diagnosis_multiselect',
      },
      {
        text: 'All (Keperawatan) (Multi Select)',
        value: 'diagnosis_keperawatan',
      },
    ],
  },
  {
    text: 'Rencana Terapi',
    children: [
      { text: 'Semua data (Multi Select Row)', value: 'rencana_terapi' },
      {
        text: 'Hanya Dokter Spesialis (Multi Select Row)',
        value: 'rencana_terapi_dokter_multiselect',
      },
      {
        text: 'Obat (Multi Select Row)',
        value: 'rencana_terapi_obat_multiselect',
      },
    ],
  },
  {
    text: 'Tindakan',
    children: [
      {
        text: 'Semua data (Multi Select Row)',
        value: 'tindakan_all_multiselect',
      },
      {
        text: 'Semua data (Tanpa Jumlah & Rupiah) (Multi Select Row)',
        value: 'tindakan_all_name_only_multiselect',
      },
    ],
  },
  {
    text: 'Parameter Tindakan',
    children: [{ text: 'Semua data', value: 'parameter_tindakan' }],
  },
  {
    text: 'Informasi Biaya',
    children: [
      { text: 'Hanya Rawat Jalan', value: 'informasi_biaya_rawat_jalan' },
    ],
  },
  {
    text: 'Pemeriksaan Penunjang',
    children: [
      {
        text: 'Semua data (Hanya data kunjungan) (Multi Select Row)',
        value: 'pemeriksaan_penunjang_kunjungan_only_multiselect',
      },
      {
        text: 'Semua data + Hasil (Multi Select Row)',
        value: 'pemeriksaan_penunjang_all_multiselect',
      },
    ],
  },
  {
    text: 'Catatan Akhir',
    children: [
      { text: 'All', value: 'catatan_akhir_all' },
      { text: 'Alasan Masuk', value: 'catatan_akhir_alasan_masuk_only' },
      { text: 'Catatan KRS', value: 'catatan_akhir_catatan_krs_only' },
    ],
  },
];

export default source;
