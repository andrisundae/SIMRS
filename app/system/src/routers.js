import { lazy } from 'react';

const routers = [
  {
    key: '_system_pengaturan_menu',
    path: '/system/pengaturan-menu',
    component: lazy(() => import('@module/pengaturan-menu'))
  },
  {
    key: '_system_pengaturan_hak_akses_menu',
    path: '/system/pengaturan-hak-akses-menu',
    component: lazy(() => import('@module/pengaturan-hak-akses'))
  },
  {
    key: '_system_setting_aturan_aplikasi',
    path: '/system/setting/aturan-aplikasi',
    component: lazy(() => import('@module/setting-aturan-aplikasi'))
  },
  {
    key: '_system_manajemen_user_personel',
    path: '/system/manajemen-user/personel',
    component: lazy(() => import('@module/personel'))
  },
  {
    key: '_system_setting_grup_unit',
    path: '/system/manajemen-user/setting/grup-unit',
    component: lazy(() => import('@module/setting-grup-unit'))
  },
  {
    key: '_system_manajemen_user_grup',
    path: '/system/manajemen-user/grup',
    component: lazy(() => import('@module/grup'))
  },
]

export default routers;

