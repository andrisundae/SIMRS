import {
    sumberLainState,
    filterState,
    sumberState,
    settingState,
} from '@simrs/main/src/modules/setting/default';

sumberLainState.data = {
    unit_layanan: [],
    status_batasan: []
}

filterState.data.data_filter_sumber = {
    klasifikasi: [],
    instalasi: [],
    kelompok: [],
}

export default {
    sumberLain: { ...sumberLainState },
    filter: { ...filterState },
    sumber: { ...sumberState },
    setting: { ...settingState },
    post: {
        needed: {
            unit_layanan: '',
            klasifikasi: '',
            status_batasan: '',
            jumlah: '0',
        },
        optional: {
            kelompok: ''
        }
    },
    focusElement: '',
    submitting: false
}
