const moduleState = {
    post: {
        id: 0,
        aktif: ''
    },
    statusForm: '',
    selectedRow: 0,
    errors: {},
}

const filterState = {
    data: {
        options_klasifikasi: [],
        options_kelompok: [],
    },
    post: {
        filter_value: '',
        filter_index: 'nama',
        klasifikasi: '',
        kelompok: '',
        status: '',
        selectedKlasifikasi: null,
        selectedStatus: null,
        selectedFilterIndex: {value: 'nama', label: 'Kelompok Layanan'},
    },
    isSubmitted: false,
    focusElement: '',
}

export {
    moduleState,
    filterState
};
