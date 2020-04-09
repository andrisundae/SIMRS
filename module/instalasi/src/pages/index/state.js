import {
  moduleState as module,
  filterState as filter,
} from '@simrs/main/src/modules/master/default';

const moduleState = {
  ...module,
  post: {
    id: '',
    nama: '',
    jenis_layanan: '',
    kelompok_jenis_layanan: '',
    aktif: 0,
    st_sebagai_asal_kunjungan: 0,
    nama_jenis_layanan: '',
    nama_kelompok_jenis_layanan: '',
  },
  data: {
    options_jenis_layanan: [],
    options_kelompok_jenis_layanan: [],
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
