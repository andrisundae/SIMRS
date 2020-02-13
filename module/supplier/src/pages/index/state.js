import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id     : '',
        nama   : '',
        alamat : "",
        email  : "",
        telp   : "",
        npwp   : "",
        alias  : "",
        nama_cp: "",
        telp_cp: "",
        aktif  : 1
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
