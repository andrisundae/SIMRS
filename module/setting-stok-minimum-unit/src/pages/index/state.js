import {
  moduleState as module,
  filterState as filter,
} from '@simrs/main/src/modules/master/default';

const moduleState = {
  ...module,
  post: {
    id: '',
    kode_barcode: '',
    nama_barang: '',
    satuan_terkecil: '',
    stok_minimum: 0,
    stok_maximum: 0,
  },
};

const filterState = {
  ...filter,
  post: {
    ...filter.post,
    id_unit_layanan: '',
    unit_layanan: '',
    nama_barang: '',
  },
  data: {
    unit_list: [],
  },
};

export { moduleState, filterState };
