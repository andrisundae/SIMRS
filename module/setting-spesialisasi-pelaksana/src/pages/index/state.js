import {
    sumberLainState,
    filterState,
    sumberState,
    settingState,
} from '@simrs/main/src/modules/setting/default';

sumberLainState.data = {
    pelaksana: []
}

export default {
    sumberLain: { ...sumberLainState },
    filter: { ...filterState },
    sumber: { ...sumberState },
    setting: { ...settingState },
    post: {
        needed: { pelaksana: '' },
        optional: {}
    },
    focusElement: '',
    submitting: false
}
