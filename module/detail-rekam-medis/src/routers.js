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
];
