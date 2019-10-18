const moduleState = {
    editedCell: {
        oldValue: 0,
        value: 0,
        rowIndex: null,
        id: 0,
        colKey: '',
    },
    statusForm: '',
    selectedRow: 0,
    error: false
}

const filterState = {
    data: {
        options_unit_layanan: [],
        options_kelas: []
    },
    post: {
        kelas: '',
        unit_layanan: '',
        selectedKelas: null,
        selectedUnitLayanan: null,
    },
    focusElement: ''
}

export {
    moduleState,
    filterState
};
