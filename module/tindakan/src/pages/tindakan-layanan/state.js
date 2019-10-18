import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/nested';

const moduleState = {
    ...module,
    post: {
        id: '',
        kode_panggil: '',
        kelas: '',
        nama_kelas: '',
        versi_tarif: '',
        aktif: 0,
        tgl_aktif_tarif: null,
        jam_aktif_tarif: null,
        tarif: 0,
        layanan: '',
        nama_layanan: ''
    },
    data: {
        selectedVersiTarif: {
            id: 0,
            nama: '',
            tgl_aktif_tarif: null
        },
        options_kelas: [],
    },
    importKelas: {
        showButton: false,
        show: false,
        selectedRows: []
    }
}

const filterState = {
    ...filter,
    post: {
        ...filter.post,
        filter_index: 'kode_panggil'
    }
}

export {
    moduleState,
    filterState
};
