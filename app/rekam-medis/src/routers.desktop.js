import { lazy } from 'react';
import mobileRouters from './routers.mobile';

// penamaan key tidak dipengaruhi oleh path
export default [
  ...mobileRouters,
  {
    key: '_billing_master_referensi_umum',
    path: '/billing/master/referensi-umum',
    component: lazy(() => import('@module/referensi-umum')),
  },
  {
    key: '_rekam_medis_icd10',
    path: '/master/icd10',
    component: lazy(() => import('@module/icd10')),
  },
  {
    key: '_rekam_medis_icd9',
    path: '/master/icd9',
    component: lazy(() => import('@module/icd9')),
  },
  {
    key: '_rekam_medis_setting_kelompok_pemeriksaan_fisik',
    path: '/master/setting-kelompok-pemeriksaan-fisik',
    component: lazy(() => import('@module/setting-kelompok-pemeriksaan-fisik')),
  },
];
