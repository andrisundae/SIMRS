import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id: '',
        nama: '',
        keterangan: ''
    }
}

const filterState = {
    ...filter,
    post: {
        ...filter.post,
        filter_index: 'nama'
    }
}

export {
    moduleState,
    filterState
};
