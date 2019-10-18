const moduleState = {
    post: {
        id: 0,
        aktif: ''
    },
    statusForm: '',
    selectedRow: 0,
    errors: {},
}
const post = {
    filter_value: '',
    filter_index: 'nama',
    klasifikasi: '',
    status: '',
    selectedKlasifikasi: null,
    selectedStatus: null,
    selectedFilterIndex: { value: 'nama', label: 'Kelompok Layanan' },
}

const filterState = {
    data: {
        options_klasifikasi: [],
    },
    post,
    currentPost: post,
    isSubmitted: false,
    disableDatatable: false,
    focusElement: '',
}

export {
    moduleState,
    filterState
};
