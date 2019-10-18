import {
    sumberLainState,
    filterState,
    sumberState,
    settingState,
} from '@simrs/main/src/modules/setting/default';

sumberLainState.data = {
    unit_penunjang: []
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
            unit_penunjang: '',
        },
        optional: {
            instalasi: '',
        }
    },
    focusElement: '',
    submitting: false
}
