import { lazy } from 'react';

// penamaan key tidak dipengaruhi oleh path
export default [
  {
    key: '_rekam_medis_main',
    path: '/main',
    component: lazy(() => import('@simrs/rekam-medis/src/Main')),
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
  {
    key: '_rekam_medis_konsul_dokter',
    path: '/konsul-dokter/pemenuhan',
    component: lazy(() => import('@module/konsul-dokter/src/pemenuhan')),
  },
  {
    key: '_rekam_medis_rawat_bersama',
    path: '/rawat-bersama/pemenuhan',
    component: lazy(() => import('@module/rawat-bersama/src/pemenuhan')),
  },
  {
    key: '_rekam_medis_alih_dpjp',
    path: '/alih-dpjp/pemenuhan',
    component: lazy(() => import('@module/alih-dpjp/src/pemenuhan')),
  },
  {
    key: '_rekam_medis_delegasi_tugas',
    path: '/delegasi-tugas/pemenuhan',
    component: lazy(() => import('@module/delegasi-tugas/src/pemenuhan')),
  },
  {
    key: '_rekam_medis_visite_dpjp',
    path: '/antrian/visite-dpjp',
    component: lazy(() => import('@module/visite-dpjp')),
  },
];
