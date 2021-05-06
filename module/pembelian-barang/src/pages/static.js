import {
  masterActionTypes,
  detailActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

const path = {
  COMMON_NOMOR_TRANSAKSI: '/system/generate/no-transaksi',
  MASTER_BARANG: '/farmasi/master/barang',
  PEMBELIAN: '/farmasi/transaksi/sub-pembelian',
  PEMBELIAN_DETAIL: '/farmasi/transaksi/sub-pembelian-detail',
  PEMBELIAN_NON_HUTANG: '/farmasi/transaksi/sub-penerimaan-pemesanansupplier',
};

const tableName = {
  DETAIL_LIST: 'table_list_detail',
  CARI_TRANSAKSI: 'table_cari_transaksi',
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

const settingNoTransaksi = 'sub_pembelian';
const settingNoTransaksiNonHutang = 'penerimaan_pemesanan_supplier';

export {
  path,
  tableName,
  formEnable,
  settingNoTransaksi,
  settingNoTransaksiNonHutang,
};
