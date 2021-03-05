import { lazy } from 'react';

const routers = [
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
  {
    key: '_farmasi_setting_barang_unit',
    path: '/farmasi/setting/barang-unit',
    component: lazy(() => import('@module/setting-barang-unit')),
  },
  {
    key: '_farmasi_setting_stok_minimum_unit',
    path: '/farmasi/setting/stok-minimum-unit',
    component: lazy(() => import('@module/setting-stok-minimum-unit')),
  },
  {
    key: '_farmasi_transaksi_pemesanan_supplier',
    path: '/farmasi/transaksi/pemesanan-supplier',
    component: lazy(() => import('@module/transaksi-pemesanan-supplier')),
  },
  {
    key: '_farmasi_transaksi_penerimaan_pemesanan_supplier',
    path: '/farmasi/transaksi/penerimaan-pemesanan-supplier',
    component: lazy(() =>
      import('@module/transaksi-penerimaan-pemesanan-supplier')
    ),
  },
  {
    key: '_farmasi_transaksi_sub_pembelian',
    path: '/farmasi/transaksi/sub-pembelian',
    component: lazy(() => import('@module/transaksi-pembelian-barang')),
  },
];

export default routers;
