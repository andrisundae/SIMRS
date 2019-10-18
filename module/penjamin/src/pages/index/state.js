import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id: '',
        nama: '',
        alamat: '',
        telp: '',
        aktif: 0,
        nama_kelas: '',
        status_jaminan: ''
    },
    data: {
        options_kelas: []
    }
}

const filterState = {
    ...filter,
    post: {
        ...filter.post,
        filter_index: 'nama',
    }
}

export {
    moduleState,
    filterState
};
