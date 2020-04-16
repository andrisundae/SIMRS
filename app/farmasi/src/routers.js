import { lazy } from 'react';

const routers = [
  {
    key: '_farmasi_master_supplier',
    path: '/farmasi/master/supplier',
    component: lazy(() => import('@module/supplier')),
  },
  {
    key: '_farmasi_master_barang',
    path: '/farmasi/master/barang',
    component: lazy(() => import('@module/barang')),
  },
  {
    key: '_system_portal_change_password',
    path: '/system/portal/change-password',
    component: lazy(() => import('@module/change-password')),
  },
  {
    key: '_billing_master_referensi_umum',
    path: '/billing/master/referensi-umum',
    component: lazy(() => import('@module/referensi-umum')),
  },
  {
    key: '_farmasi_setting_unit_farmasi',
    path: '/farmasi/setting/unit-farmasi',
    component: lazy(() => import('@module/unit-farmasi')),
  },
];

export default routers;
