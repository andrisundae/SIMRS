import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/nested';

const moduleState = {
    ...module,
    post: {
        id: '',
        nama: '',
        nama_cetak: '',
        aktif: 0,
        st_cito: 0,
    }
}

const filterState = {
    ...filter,
    data: {
        ...filter.data,
        options_klasifikasi: [],
        options_versi_tarif: [],
    },
    post: {
        ...filter.post,
        filter_index: 'nama',
        klasifikasi: '',
        selectedKlasifikasi: null,
        versi_tarif: '',
        selectedVersiTarif: null
    }
}

export {
    moduleState,
    filterState
};
