import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id: '',
        nama: '',
        jenis_klasifikasi: 0,
        aktif: 0,
        nama_jenis_klasifikasi: ''
    },
    data: {
        options_jenis_klasifikasi: []
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
