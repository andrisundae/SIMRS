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
        options_versi_tarif: [],
        options_kelompok: [],
        options_kelas: [],
    },
    post: {
        klasifikasi: '',
        kelompok: '',
        status: '',
        selectedKlasifikasi: null,
        selectedStatus: null,
        selectedFilterIndex: {value: 'nama', label: 'Kelompok Layanan'},
        nama_layanan: '',
        versi_tarif: '',
        kelas: '',
        selectedVersiTarif: null,
        selectedKelompok: null,
        selectedKelas: null,
    },
    isSubmitted: false,
    focusElement: '',
}

export {
    moduleState,
    filterState
};
