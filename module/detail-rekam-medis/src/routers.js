import { lazy } from 'react';

export default [
  {
    key: '_anamnesis',
    path: '/anamnesis',
    component: lazy(() => import('@module/anamnesis')),
  },
  {
    key: '_pemeriksaan_umum',
    path: '/pemeriksaan-umum',
    component: lazy(() => import('@module/pemeriksaan-umum')),
  },
  {
    key: '_pemeriksaan_fisik',
    path: '/pemeriksaan-fisik',
    component: lazy(() => import('@module/pemeriksaan-fisik')),
  },
  {
    key: '_triage',
    path: '/pengkajian-khusus/triage',
    component: lazy(() => import('@module/triage')),
  },
  {
    key: '_prehospital',
    path: '/pengkajian-khusus/prehospital',
    component: lazy(() => import('@module/prehospital')),
  },
  {
    key: '_prehospital',
    path: '/pengkajian-khusus/prehospital',
    component: lazy(() => import('@module/prehospital')),
  },
  {
    key: '_screening_resiko_jatuh_dewasa',
    path: '/pengkajian-khusus/screening-resiko-jatuh-dewasa',
    component: lazy(() => import('@module/screening-resiko-jatuh-dewasa')),
  },
  {
    key: '_screening_resiko_jatuh_anak',
    path: '/pengkajian-khusus/screening-resiko-jatuh-anak',
    component: lazy(() => import('@module/screening-resiko-jatuh-anak')),
  },
  {
    key: '_screening_resiko_jatuh_geriatri',
    path: '/pengkajian-khusus/screening-resiko-jatuh-geriatri',
    component: lazy(() => import('@module/screening-resiko-jatuh-geriatri')),
  },
  {
    key: '_screening_resiko_jatuh_rawat_jalan',
    path: '/pengkajian-khusus/screening-resiko-jatuh-rawat-jalan',
    component: lazy(() => import('@module/screening-resiko-jatuh-rawat-jalan')),
  },
  {
    key: '_screening_nyeri_dewasa',
    path: '/pengkajian-khusus/screening-nyeri-dewasa',
    component: lazy(() => import('@module/screening-nyeri-dewasa')),
  },
  {
    key: '_screening_nyeri_anak',
    path: '/pengkajian-khusus/screening-nyeri-anak',
    component: lazy(() => import('@module/screening-nyeri-anak')),
  },
  {
    key: '_screening_nyeri_bayi',
    path: '/pengkajian-khusus/screening-nyeri-bayi',
    component: lazy(() => import('@module/screening-nyeri-bayi')),
  },
  {
    key: '_screening_nyeri_geriatri',
    path: '/pengkajian-khusus/screening-nyeri-geriatri',
    component: lazy(() => import('@module/screening-nyeri-geriatri')),
  },
  {
    key: '_screening_gizi_dewasa',
    path: '/pengkajian-khusus/screening-gizi-dewasa',
    component: lazy(() => import('@module/screening-gizi-dewasa')),
  },
  {
    key: '_screening_gizi_anak',
    path: '/pengkajian-khusus/screening-gizi-anak',
    component: lazy(() => import('@module/screening-gizi-anak')),
  },
  {
    key: '_screening_gizi_obstetri',
    path: '/pengkajian-khusus/screening-gizi-obstetri',
    component: lazy(() => import('@module/screening-gizi-obstetri')),
  },
  {
    key: '_screening_intervensi_gizi',
    path: '/pengkajian-khusus/screening-intervensi-gizi',
    component: lazy(() => import('@module/screening-intervensi-gizi')),
  },
  {
    key: '_screening_activity_daily_living',
    path: '/pengkajian-khusus/screening-activity-daily-living',
    component: lazy(() => import('@module/screening-activity-daily-living')),
  },
  {
    key: '_screening_decubitus_norton_scale',
    path: '/pengkajian-khusus/screening-decubitus-norton-scale',
    component: lazy(() => import('@module/screening-decubitus-norton-scale')),
  },
  {
    key: '_screening_depresi_geriatri',
    path: '/pengkajian-khusus/screening-depresi-geriatri',
    component: lazy(() => import('@module/screening-depresi-geriatri')),
  },
  {
    key: '_screening_status_mental_geriatri',
    path: '/pengkajian-khusus/screening-status-mental-geriatri',
    component: lazy(() => import('@module/screening-status-mental-geriatri')),
  },
  {
    key: '_screening_apgar_score',
    path: '/pengkajian-khusus/screening-apgar-score',
    component: lazy(() => import('@module/screening-apgar-score')),
  },
  {
    key: '_screening_downe_score',
    path: '/pengkajian-khusus/screening-downe-score',
    component: lazy(() => import('@module/screening-downe-score')),
  },
  {
    key: '_konsul_dokter',
    path: '/kerja-sama-medis/konsul-dokter/permintaan',
    component: lazy(() => import('@module/konsul-dokter/src/permintaan')),
  },
  {
    key: '_rawat_bersama',
    path: '/kerja-sama-medis/rawat-bersama/permintaan',
    component: lazy(() => import('@module/rawat-bersama/src/permintaan')),
  },
  {
    key: '_alih_dpjp',
    path: '/kerja-sama-medis/alih-dpjp/permintaan',
    component: lazy(() => import('@module/alih-dpjp/src/permintaan')),
  },
  {
    key: '_delegasi_tugas',
    path: '/kerja-sama-medis/delegasi-tugas/permintaan',
    component: lazy(() => import('@module/delegasi-tugas/src/permintaan')),
  },
  {
    key: '_pemeriksaan_penunjang',
    path: '/pemeriksaan-penunjang',
    component: lazy(() => import('@module/pemeriksaan-penunjang')),
  },
  {
    key: '_cppt',
    path: '/cppt',
    component: lazy(() => import('@module/cppt')),
  },
  {
    key: '_resep',
    path: '/resep',
    component: lazy(() => import('@module/resep')),
  },
];
