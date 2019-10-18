import {
    sumberLainState,
    filterState,
    sumberState,
    settingState,
} from '@simrs/main/src/modules/setting/default';

sumberLainState.data = {
    unit_layanan: [],
    status: [],
}

filterState.data.filter_sumber_lain = {
    instalasi: []
}

export default {
    sumberLain: { ...sumberLainState },
    filter: { ...filterState },
    sumber: { ...sumberState },
    setting: { ...settingState },
    post: {
        needed: {
            unit_layanan: 0,
            status: 0
        },
        optional: {
            instalasi: 0,
        }
    },
    focusElement: '',
    submitting: false
}
