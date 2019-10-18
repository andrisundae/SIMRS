import {
    sumberLainState,
    filterState,
    sumberState,
    settingState,
} from '@simrs/main/src/modules/setting/default';

filterState.data.filter_sumber_lain = {
    instalasi: []
}

filterState.data.data_filter_sumber = {
    versi_tarif: [],
    unit_layanan: [],
    kelompok: [],
    kelas: [],
}

filterState.data.filter_sumber = {
    klasifikasi: [],
}

export default {
    sumberLain: { ...sumberLainState },
    filter: { ...filterState },
    sumber: { ...sumberState },
    setting: { ...settingState },
    post: {
        needed: {
            versi_tarif: '',
            unit_layanan: '',
            klasifikasi: ''
        },
        optional: {
            instalasi: '',
            kelompok: '',
            kelas: ''
        }
    },
    focusElement: '',
    submitting: false
}
