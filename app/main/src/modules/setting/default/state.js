const sumberLainState = {
    data: {}
}

const dataSettingState = {
    data: {}
}

const filterState = {
    data: {
        filter_sumber_lain: {},
        filter_sumber: {},
        data_filter_sumber: {},
    }
}

const sumberState = {
    columnDefs: [],
    searchBar: '',
    selectedRows: []
};

const settingState = {
    columnDefs: [],
    searchBar: '',
    selectedRows: []
};

const moduleState = {
    sumberLain: sumberLainState,
    dataSetting: dataSettingState,
    filter: filterState,
    sumber: sumberState,
    setting: settingState,
    post: {
        needed: {},
        optional: {}
    },
    focusElement: '',
    submitting: false
};

export {
    sumberLainState,
    dataSettingState,
    filterState,
    sumberState,
    settingState,
    moduleState
};
