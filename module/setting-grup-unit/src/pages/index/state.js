import {
    sumberLainState,
    filterState,
    sumberState,
    settingState,
} from '@simrs/main/src/modules/setting/default';

sumberLainState.data = {
    grup: []
}

filterState.data.data_filter_sumber = {
    instalasi: []
}

export default {
    sumberLain: { ...sumberLainState },
    filter: { ...filterState },
    sumber: { ...sumberState },
    setting: { ...settingState },
    post: {
        needed: {
            grup: '',
        },
        optional: {
            instalasi: '',
        }
    },
    focusElement: '',
    submitting: false
}
