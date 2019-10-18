import {
    sumberLainState,
    filterState,
    sumberState,
    settingState,
} from '@simrs/main/src/modules/setting/default';

sumberLainState.data = {
    status_batasan: []
}

filterState.data.data_filter_sumber = {
    klasifikasi: [],
    kelompok: [],
}

export default {
    sumberLain: { ...sumberLainState },
    filter: { ...filterState },
    sumber: { ...sumberState },
    setting: { ...settingState },
    post: {
        needed: {
            klasifikasi: '',
            status_batasan: '',
            jumlah: 0,
        },
        optional: {
            kelompok: ''
        }
    },
    focusElement: '',
    submitting: false
}
