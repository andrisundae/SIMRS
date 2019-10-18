import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id: '',
        nama: '',
        tgl_aktif_tarif: null,
        jam_aktif_tarif: null,
        id_st_aktif_kunjungan: '',
        id_versi_tarif_asal: null,
        aktif: 0,
        status_aktif_kunjungan: ''
    },
    data: {
        options_status_aktif_kunjungan: []
    },
    duplication: {
        show: false,
        selectedData: {
            id: '',
            nama: '',
            tgl_aktif_tarif: null,
            jam_aktif_tarif: null,
            id_st_aktif_kunjungan: '',
            aktif: 0,
            status_aktif_kunjungan: ''
        },
        post: {
            versi_tarif_asal: 0,
            nama_tarif_asal: '',
            versi_tarif_tujuan: 0,
            nama_tarif_tujuan: ''
        }
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
