import { lazy } from 'react';

const routers = [
  {
    key: '_billing_master_jenis_layanan',
    path: '/billing/master/jenis-layanan',
    component: lazy(() => import('@module/jenis-layanan')),
  },
  {
    key: '_billing_master_kelompok_jenis_layanan',
    path: '/billing/master/kelompok-jenis-layanan',
    component: lazy(() => import('@module/kelompok-jenis-layanan')),
  },
  {
    key: '_billing_master_instalasi',
    path: '/billing/master/instalasi',
    component: lazy(() => import('@module/instalasi')),
  },
  {
    key: '_billing_master_unit_layanan',
    path: '/billing/master/unit-layanan',
    component: lazy(() => import('@module/unit-layanan')),
  },
  {
    key: '_billing_master_wilayah',
    path: '/billing/master/wilayah',
    component: lazy(() => import('@module/wilayah')),
  },
  {
    key: '_billing_master_pasien_import',
    path: '/billing/master/pasien/import',
    component: lazy(() => import('@module/import-pasien')),
  },
  {
    key: '_billing_master_tarif_import',
    path: '/billing/master/tarif/import',
    component: lazy(() => import('@module/import-tarif')),
  },
  {
    key: '_billing_master_referensi_umum',
    path: '/billing/master/referensi-umum',
    component: lazy(() => import('@module/referensi-umum')),
  },
  {
    key: '_billing_master_jenis_klasifikasi',
    path: '/billing/master/jenis-klasifikasi',
    component: lazy(() => import('@module/jenis-klasifikasi')),
  },
  {
    key: '_billing_master_klasifikasi',
    path: '/billing/master/klasifikasi',
    component: lazy(() => import('@module/klasifikasi')),
  },
  {
    key: '_billing_master_tarif',
    path: '/billing/master/tarif',
    component: lazy(() => import('@module/tarif')),
  },
  {
    key: '_billing_master_komponen_tarif',
    path: '/billing/master/komponen-tarif',
    component: lazy(() => import('@module/komponen-tarif')),
  },
  {
    key: '_billing_master_kelas',
    path: '/billing/master/kelas',
    component: lazy(() => import('@module/kelas')),
  },
  {
    key: '_billing_master_versi_tarif',
    path: '/billing/master/versi-tarif',
    component: lazy(() => import('@module/versi-tarif')),
  },
  {
    key: '_billing_master_tindakan',
    path: '/billing/master/tindakan',
    component: lazy(() => import('@module/tindakan')),
  },
  {
    key: '_billing_master_koreksi_tarif_kelas',
    path: '/billing/master/koreksi-tarif-kelas',
    component: lazy(() => import('@module/koreksi-tarif-kelas')),
  },
  {
    key: '_billing_master_non_aktif_kelompok',
    path: '/billing/master/non-aktif-kelompok',
    component: lazy(() => import('@module/non-aktif-kelompok')),
  },
  {
    key: '_billing_master_non_aktif_layanan',
    path: '/billing/master/non-aktif-layanan',
    component: lazy(() => import('@module/non-aktif-layanan')),
  },
  {
    key: '_billing_master_non_aktif_layanan_tarif_kelas',
    path: '/billing/master/non-aktif-layanan-tarif-kelas',
    component: lazy(() => import('@module/non-aktif-layanan-tarif-kelas')),
  },
  {
    key: '_billing_master_asal_masuk',
    path: '/billing/master/asal-masuk',
    component: lazy(() => import('@module/asal-masuk')),
  },
  {
    key: '_billing_master_penjamin',
    path: '/billing/master/penjamin',
    component: lazy(() => import('@module/penjamin')),
  },
  {
    key: '_billing_master_diagnosis_ix',
    path: '/billing/master/diagnosis-ix',
    component: lazy(() => import('@module/diagnosis-ix')),
  },
  {
    key: '_billing_master_diagnosis_x',
    path: '/billing/master/diagnosis-x',
    component: lazy(() => import('@module/diagnosis-x')),
  },
  {
    key: '_billing_master_stok_unit_layanan',
    path: '/billing/master/stok-unit-layanan',
    component: lazy(() => import('@module/stok-unit-layanan')),
  },
  {
    key: '_billing_master_ekspor_tarif',
    path: '/billing/master/ekspor-tarif',
    component: lazy(() => import('@module/ekspor-tarif')),
  },

  {
    key: '_billing_setting_klasifikasi_komponen',
    path: '/billing/setting/klasifikasi-komponen',
    component: lazy(() => import('@module/setting-klasifikasi-komponen')),
  },
  {
    key: '_billing_setting_tarif_unit_layanan',
    path: '/billing/setting/tarif-unit-layanan',
    component: lazy(() => import('@module/setting-tarif-unit-layanan')),
  },
  {
    key: '_billing_setting_klasifikasi_penunjang',
    path: '/billing/setting/klasifikasi-penunjang',
    component: lazy(() => import('@module/setting-klasifikasi-penunjang')),
  },
  {
    key: '_billing_setting_jumlah_layanan_harian_global',
    path: '/billing/setting/setting-jumlah-layanan-harian-global',
    component: lazy(() =>
      import('@module/setting-jumlah-layanan-harian-global')
    ),
  },
  {
    key: '_billing_setting_jumlah_layanan_harian_unit_layanan',
    path: '/billing/setting/setting-jumlah-layanan-harian-unit-layanan',
    component: lazy(() =>
      import('@module/setting-jumlah-layanan-harian-unit-layanan')
    ),
  },
  {
    key: '_billing_setting_no_transaksi',
    path: '/billing/setting/setting-no-transaksi',
    component: lazy(() => import('@module/setting-no-transaksi')),
  },
  {
    key: '_billing_setting_asal_masuk_instalasi',
    path: '/billing/setting/asal-masuk-instalasi',
    component: lazy(() => import('@module/setting-asal-masuk-instalasi')),
  },
  {
    key: '_billing_setting_spesialisasi_pelaksana',
    path: '/billing/setting/setting-spesialisasi-pelaksana',
    component: lazy(() => import('@module/setting-spesialisasi-pelaksana')),
  },
  {
    key: '_billing_setting_pelaksana_unit_layanan',
    path: '/billing/setting/setting-pelaksana-unit-layanan',
    component: lazy(() => import('@module/setting-pelaksana-unit-layanan')),
  },
  {
    key: '_billing_setting_kelas_penjamin',
    path: '/billing/setting/setting-kelas-penjamin',
    component: lazy(() => import('@module/setting-kelas-penjamin')),
  },
  {
    key: '_billing_setting_instalasi_kelas_tambahan',
    path: '/billing/setting/setting-instalasi-kelas-tambahan',
    component: lazy(() => import('@module/setting-instalasi-kelas-tambahan')),
  },
  {
    key: '_system_portal_change_password',
    path: '/system/portal/change-password',
    component: lazy(() => import('@module/change-password')),
  },
  {
    key: '_billing_transaksi_kunjungan',
    path: '/billing/transaksi/kunjungan',
    component: lazy(() => import('@module/kunjungan')),
  },
  {
    key: '_billing_setting_jenis_klasifikasi_registrasi',
    path: '/billing/setting/jenis-klasifikasi-registrasi',
    component: lazy(() =>
      import('@module/setting-jenis-klasifikasi-registrasi')
    ),
  },
  {
    key: '_billing_setting_layanan_spesialisasi',
    path: '/billing/setting/layanan-spesialisasi',
    component: lazy(() => import('@module/setting-layanan-spesialisasi')),
  },
  {
    key: '_billing_antrian_kunjungan',
    path: '/billing/antrian/kunjungan',
    component: lazy(() => import('@module/antrian-kunjungan')),
  },
  {
    key: '_billing_informasi_kunjungan',
    path: '/billing/informasi/kunjungan',
    component: lazy(() => import('@module/informasi-kunjungan')),
  },
  {
    key: '_billing_transaksi_tindakan',
    path: '/billing/transaksi/tindakan',
    component: lazy(() => import('@module/tindakan-kunjungan')),
  },
  {
    key: '_billing_setting_layanan_spesialisasi_pelaksana',
    path: '/billing/setting/layanan-spesialisasi-pelaksana',
    component: lazy(() => import('@module/setting-layanan-spesialisasi-pelaksana')),
  },
];

export default routers;
