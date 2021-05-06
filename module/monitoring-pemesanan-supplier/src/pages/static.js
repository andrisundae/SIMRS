import {
  masterActionTypes,
  detailActionTypes,
} from '@simrs/main/src/modules/transaksi/farmasi';

const path = {
  PEMESANAN_SUPPLIER: '/farmasi/informasi/monitoring-pemesanan',
};

const tableName = {
  PEMESANAN: 'table_list_pemesanan',
  ITEM_PEMESANAN: 'table_item_pemesanan',
  PENERIMAAN: 'table_list_penerimaan',
  ITEM_PENERIMAAN: 'table_item_penerimaan',
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

export { path, tableName, formEnable };
