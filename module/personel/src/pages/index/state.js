import { moduleState as module, filterState as filter } from '@simrs/main/src/modules/master/default';

const moduleState = {
    ...module,
    post: {
        id: '',
        nip: '',
        nama: '',
        inisial: '',
        id_jenis_kelamin: '',
        telpon: '',
        id_pendidikan: '',
        id_spesialisasi_pegawai: '',
        id_jenis_pegawai: '',
        id_jabatan_fungsional: '',
        alias_status_aplikasi: '',
        username: '',
        password: '',
        grups: [],
    },
    data: {
        options_jenis_kelamin: [],
        options_pendidikan: [],
        options_jenis_pegawai: [],
        options_spesialisasi: [],
        options_jabatan_fungsional: [],
        options_status_aplikasi: [],
        options_grup: [],
    },
    auth: {
        forceLogout: false,
        resetPassword: false,
    },
}

const uploadGambarState = {
    show: false,
    data: {
        options_personel: [],
        options_jenis_gambar: []
    },
    post: {
        id: 0,
        id_jenis_gambar_personel: '',
        id_personel: '',
        file: {},
        imageUrl: '',
        selectedPersonel: null,
        selectedJenisGambar: null
    }
}

const filterState = {
    ...filter,
    data: {
        options_status_aplikasi: [],
    },
    post: {
        ...filter.post,
        filter_index: 'nama',
        search_id_status_aplikasi: ''
    }
}

export {
    moduleState,
    filterState,
    uploadGambarState
};
