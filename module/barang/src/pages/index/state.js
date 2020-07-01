import {
  moduleState as module,
  filterState as filter,
} from '@simrs/main/src/modules/master/default';

const moduleState = {
  ...module,
  post: {
    id: '',
    barcode: '',
    nama: '',
    auto_update_harga_jual: 0,
    persentase_profit: 0,
    st_expired: 0,
    het: 0,
    include_diskon_pembelian: 0,
    is_aktif: 1,
    id_golongan: '',
    golongan_barang: '',
    id_jenis: '',
    jenis_barang: '',
    id_kelompok: '',
    kelompok_barang: '',
    id_satuan_terkecil: '',
    satuan_terkecil: '',
    id_metode_update_harga: '',
    metode_update_harga_jual: '',
  },
  dataForm: {
    options_jenis_barang: [],
    options_kelompok_barang: [],
    options_golongan_barang: [],
    options_satuan_barang: [],
    options_metode_update: [],
  },
};

const filterState = {
  ...filter,
  post: {
    ...filter.post,
    filter_index: 'nama',
  },
};

export { moduleState, filterState };
