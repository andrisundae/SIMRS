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
    tanggal_transaksi: '',
    id_pemesanan: '',
    no_pemesanan: '',
    tanggal_pemesanan: '',
    id_supplier: '',
    supplier: '',
    id_unit: '',
    unit_penerima: '',
    nomor_faktur: '',
    tanggal_faktur: '',
    tanggal_jatuh_tempo: '',
    hitung_ppn: '',
    hitung_ppn_label: '',
  },
  data: {
    ...defaultMasterState.data,
    initial: {
      ...defaultMasterState.data.initial,
      options_hitung_ppn: [],
    },
  },
};

const detailState = {
  ...defaultDetailState,
  post: {
    ...defaultDetailState.post,
    id: '',
    id_barang: '',
    kode_barang: '',
    nama_barang: '',
    satuan_terkecil: '',
    jumlah_pesan: '',
    jumlah_terima_sbl: '',
    no_batch: '',
    expired_date: '',
    jumlah_terima: 0,
    harga_satuan: 0,
    diskon: 0,
    diskon_rp: 0,
    ppn: 10,
    ppn_rp: 0,
    total_harga: 0,
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
  cari_pemesanan: {
    ...defaultFilterState.cari_master,
    form_type: 'pemesanan',
    tgl_awal: dayjs().toDate(),
    tgl_akhir: dayjs().toDate(),
    tglAwal: dateFormatDB(dayjs().toDate()),
    tglAkhir: dateFormatDB(dayjs().toDate()),
    use_tgl: true,
    filter_idx: '',
  },
  cari_detail: {
    ...defaultFilterState.cari_detail,
    nama_barang: '',
  },
  filter_modal: {
    ...defaultFilterState.filter_modal,
    pemesanan_modal: {
      show: false,
    },
  },
  data: {
    ...defaultFilterState.data,
    initial: {
      option_filter_pemesanan: [],
      option_filter_transaksi: [],
    },
    selectedData: {
      cari_pemesanan: {},
    },
  },
};

export { masterState, detailState, filterState };
