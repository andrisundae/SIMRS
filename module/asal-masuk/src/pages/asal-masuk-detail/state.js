import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/nested';

const moduleState = {
    ...module,
    post: {
        id: '',
        nama: '',
        asal_masuk: '',
        aktif: 0
    },
    importDetail: {
        show: false,
        selectedRows: [],
        data: {
            options_instalasi: [],
        },
        filter: {
            selectedInstalasi: null
        },
        isReloadGrid: false
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
