import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id: '',
        alias: '',
        prefix: '',
        format_tanggal: '',
        type_reset: '',
        jumlah_digit: 0,
    },
    data: {
        options_type_reset: [],
        options_format_tanggal: [],
    },
    settingCounter: {
        show: false,
        post: {
            alias: '',
            start_counter: 0
        }
    }
}

const filterState = {
    ...filter,
    post: {
        ...filter.post,
        filter_index: 'alias'
    }
}

export {
    moduleState,
    filterState
};
