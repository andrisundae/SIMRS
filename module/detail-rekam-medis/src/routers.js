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
];
