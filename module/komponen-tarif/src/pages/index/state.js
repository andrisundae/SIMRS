import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id: '',
        nama: '',
        keterangan: '',
        penanggung_jawab: '',
        aktif: 0,
        nama_penanggung_jawab: null
    },
    data: {
        options_penanggung_jawab: [],
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
