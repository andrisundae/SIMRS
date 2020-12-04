import {
  masterState as defaultMasterState,
  detailState as defaultDetailState,
  filterState as defaultFilterState,
} from '@simrs/main/src/modules/transaksi/farmasi';

import dayjs from 'dayjs';
import { dateFormatDB } from '@simrs/common/src/utils';

const masterState = {
  ...defaultMasterState,
  post: {
    ...defaultMasterState.post,
    id: '',
    no_transaksi: '',
    id_supplier: '',
    nama_supplier: '',
    id_unit: '',
    nama_unit: '',
    tanggal_transaksi: '',
  },
  data: {
    ...defaultMasterState.data,
    initial: {
      ...defaultMasterState.data.initial,
      option_supplier: [],
      option_unit: [],
    },
  },
};

const detailState = {
  ...defaultDetailState,
  post: {
    ...defaultDetailState.post,
    id: '',
    master_id: '',
    kode_barang: '',
    nama_barang: '',
    id_barang: '',
    stok: '',
    jumlah_pesan: '',
    harga_satuan: '',
    satuan_terkecil: '',
    tgl_masuk: '',
  },
};

const filterState = {
  ...defaultFilterState,
  cari_master: {
    ...defaultFilterState.cari_master,
    tgl_awal: dayjs().toDate(),
    tgl_akhir: dayjs().toDate(),
    tglAwal: dateFormatDB(dayjs().toDate()),
    tglAkhir: dateFormatDB(dayjs().toDate()),
    use_tgl: true,
    filter_idx: '',
  },
  cari_detail: {
    ...defaultFilterState.cari_detail,
    ts_barang_supplier: true,
    id_unit: 0,
    id_supplier: 0,
    nama_barang: '',
  },
  data: {
    ...defaultFilterState.data,
    initial: {
      option_filter: [],
    },
  },
};

export { masterState, detailState, filterState };
