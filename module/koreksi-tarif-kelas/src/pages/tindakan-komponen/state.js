import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/nested';

const moduleState = {
    ...module,
    post: {
        tindakan: '',
        tarif_tindakan: 0,
        list_tindakan_komponen: [],
        is_edit_tindakan: false
    },
    redirectTindakan: false
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
