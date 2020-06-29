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
    component: lazy(() => import('@module/setting-unit-farmasi')),
  },
  {
    key: '_farmasi_setting_harga_jual',
    path: '/farmasi/setting/harga-jual',
    component: lazy(() => import('@module/setting-harga-jual')),
  },
  {
    key: '_farmasi_setting_barang_supplier',
    path: '/farmasi/setting/barang-supplier',
    component: lazy(() => import('@module/setting-barang-supplier')),
  },
];

export default routers;
