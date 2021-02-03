import {
  masterActionTypes,
  detailActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

const path = {
  COMMON_NOMOR_TRANSAKSI: '/system/generate/no-transaksi',
  PEMESANAN_SUPPLIER: '/farmasi/transaksi/pemesanan-supplier',
  PENERIMAAN_PEMESANAN: '/farmasi/transaksi/penerimaan-pemesanan-supplier',
  PENERIMAAN_PEMESANAN_DETAIL:
    '/farmasi/transaksi/penerimaan-pemesanan-supplier-detail',
};

const tableName = {
  DETAIL_LIST: 'table_list_detail',
  CARI_TRANSAKSI: 'table_cari_transaksi',
  CARI_PEMESANAN: 'table_cari_pemesanan',
  DETAIL_PEMESANAN: 'table_detail_pemesanan',
  BARANG_LIST: 'table_list_barang',
};

const formEnable = {
  MasterStatus: [masterActionTypes.ADD],
  DetailStatus: [detailActionTypes.ADD, detailActionTypes.EDIT],
  ListDetailStatus: [
    detailActionTypes.READY,
    detailActionTypes.CANCEL,
    detailActionTypes.SELECTED,
  ],
};

const settingNoTransaksi = 'penerimaan_pemesanan_supplier';

export { path, tableName, formEnable, settingNoTransaksi };
