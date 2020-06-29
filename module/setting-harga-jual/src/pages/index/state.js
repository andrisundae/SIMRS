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
    harga_jual: 0,
  },
  history: {
    show: false,
  },
};

const filterState = {
  ...filter,
  post: {
    ...filter.post,
    filter_index: 'nama_barang',
  },
};

export { moduleState, filterState };
