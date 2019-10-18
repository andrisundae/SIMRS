import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id: '',
        nama: '',
        aktif: 0
    }
}

const filterState = {
    ...filter,
    data: {
        options_referensi: []
    },
    post: {
        ...filter.post,
        filter_index: 'nama',
        referensi:'',
    }
}

export {
    moduleState,
    filterState
};
