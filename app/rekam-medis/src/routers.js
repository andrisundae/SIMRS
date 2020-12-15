import { lazy } from 'react';

// penamaan key tidak dipengaruhi oleh path

export default [
  {
    key: '_rekam_medis_main',
    path: '/main',
    component: lazy(() => import('@simrs/rekam-medis/src/Main')),
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
    key: '_rekam_medis_antrian_umum',
    path: '/antrian/umum',
    component: lazy(() => import('@module/antrian-rekam-medis/src/umum')),
  },
  {
    key: '_rekam_medis_antrian_penunjang',
    path: '/antrian/penunjang',
    component: lazy(() => import('@module/antrian-rekam-medis/src/penunjang')),
  },
  {
    key: '_rekam_medis_detail_umum',
    path: '/detail-rekam-medis/umum',
    component: lazy(() => import('@module/detail-rekam-medis/src/umum')),
  },
  {
    key: '_rekam_medis_detail_penunjang',
    path: '/detail-rekam-medis/penunjang',
    component: lazy(() => import('@module/detail-rekam-medis/src/penunjang')),
  },
];
