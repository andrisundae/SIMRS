import { lazy } from 'react';
import mobileRouters from './routers.mobile';

// penamaan key tidak dipengaruhi oleh path
export default [
  ...mobileRouters,
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
];
