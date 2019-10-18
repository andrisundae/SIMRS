import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/nested';

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
    post: {
        ...filter.post,
        filter_index: 'nama'
    }
}

export {
    moduleState,
    filterState
};
